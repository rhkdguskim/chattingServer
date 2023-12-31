import { Inject } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import {
  RequestMessage,
  RequestMultiRead,
  RequestSingleMessage,
  ResponseMessage,
  ResponseMultiRead,
  ResponseSingleRead,
} from "../dto/chat.dto";
import { GetWsUserID } from "@lib/common/decorator/auth.decorator";
import { RoomService } from "../providers/room.service.interface";
import { ChatService } from "../providers/chat.service.interface";
import { CHAT_SERVICE, ROOM_SERVICE } from "../chat.metadata";
import { RoomEntity, RoomType } from "@app/chat/entity/room.entity";
import { ParticipantEntity } from "@app/chat/entity/participant.entity";
import { ChatEntity } from "@app/chat/entity/chatting.entity";
import { ChatGateway } from "@app/chat/gateway/chat.gateway.interface";
import { AUTHORIZATION_SERVICE } from "@app/auth/authorization.metadata";
import { AuthorizationService } from "@app/auth/providers/authorization.service.interface";

@WebSocketGateway({ cors: true })
export class ChatGatewayImpl
  implements OnGatewayConnection, OnGatewayDisconnect, ChatGateway
{
  constructor(
    @Inject(AUTHORIZATION_SERVICE)
    private readonly authorizationService: AuthorizationService,
    @Inject(CHAT_SERVICE)
    private readonly chattingService: ChatService,
    @Inject(ROOM_SERVICE)
    private readonly roomService: RoomService
  ) {}

  @WebSocketServer()
  server: Server;

  public async handleConnection(
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const authToken = client.handshake?.query?.token as string;
    try {
      client.data.user = await this.authorizationService.verify(authToken);
    } catch (e) {
      client.disconnect();
    }
  }

  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    if (client.data.rooms) {
      client.data.rooms.forEach((roomId: string) => {
        client.leave(roomId);
      });
    }
  }

  @SubscribeMessage("Join")
  async joinRoom(
    @GetWsUserID() user_id: number,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const participants: ParticipantEntity[] =
      await this.roomService.getParticipantByUserID(user_id);
    participants.forEach((participant) => {
      client.join(String(participant.room.id));
    });
  }

  @SubscribeMessage("SendMessage")
  async message(
    @GetWsUserID() user_id: number,
    @MessageBody() request: RequestMessage
  ): Promise<ResponseMessage> {
    const { room_id } = request;
    const room: RoomEntity = await this.roomService.getRoomByID(room_id);
    room.last_chat = request.message;
    const { participants, ...newRoom } = room;
    await this.roomService.updateRoomStatus(newRoom);

    const not_read_chat: number =
      room.type !== RoomType.INDIVIDUAL ? participants.length : 0;

    const ChattingMessage: ChatEntity =
      await this.chattingService.createChatting(user_id, request);

    const msg = new ResponseMessage({
      id: ChattingMessage.id,
      room: { id: room_id },
      user: { id: user_id },
      message: request.message,
      not_read_chat: not_read_chat - 1,
      createdAt: ChattingMessage.createdAt,
    });

    this.server.to(String(request.room_id)).emit("SendMessage", msg);

    return msg;
  }

  @SubscribeMessage("ReadSingle")
  async readMessage(
    @GetWsUserID() user_id: number,
    @MessageBody() message: RequestSingleMessage
  ): Promise<ResponseSingleRead> {
    const chattingMessage = await this.chattingService.findChattingById(
      message.id
    );

    if (!chattingMessage) {
      return;
    }

    // 사용자가 이미 이 메시지를 읽었는지 확인합니다.
    const alreadyRead = chattingMessage.readBys.some(
      (readBy) => readBy.user.id === user_id
    );

    if (!alreadyRead) {
      // not_read_chat 값을 1 감소시킵니다.
      chattingMessage.not_read_chat -= 1;

      await this.chattingService.updateChatting(chattingMessage);
    }

    const response: ResponseSingleRead = {
      id: chattingMessage.id,
      room_id: chattingMessage.room.id,
      user_id,
    };

    this.server
      .to(String(chattingMessage.room.id))
      .emit("ReadSingle", response);

    return response;
  }

  @SubscribeMessage("ReadMulti")
  async readMultiMessage(
    @GetWsUserID() user_id: number,
    @MessageBody() message: RequestMultiRead
  ): Promise<ResponseMultiRead> {
    // roomId를 기준으로 채팅 메시지들을 가져옵니다.
    const chattings = await this.chattingService.findChattingByRoomID(
      message.id
    );
    const readChattingIds: number[] = [];

    for (const chattingMessage of chattings) {
      // 사용자가 이미 이 메시지를 읽었는지 확인합니다.
      const alreadyRead = chattingMessage.readBys.some(
        (readBy) => readBy.user.id === user_id
      );

      if (!alreadyRead) {
        // not_read_chat 값을 1 감소시킵니다.
        chattingMessage.not_read_chat -= 1;

        await this.chattingService.updateChatting(chattingMessage);
        readChattingIds.push(chattingMessage.id);
      }
    }

    const response: ResponseMultiRead = {
      id: readChattingIds,
      user_id,
    };

    this.server.to(String(message.id)).emit("ReadMulti", response);

    return response;
  }
}
