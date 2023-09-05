import { UseGuards, UseInterceptors } from "@nestjs/common";
import {
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { ChattingService } from "./chatting.service";
import { RequestMessage, ResponseMessage } from "./dto/chatting.dto";
import {
  RequestMultiRead,
  RequestSingleMessage,
  ResponseMultiRead,
  ResponseSingleRead,
} from "./dto/chatting.dto";

import { User } from "@src/entitys/users.entity";
import { RoomService } from "./room.service";
import { Room } from "@src/entitys/room.entity";
import { Chatting } from "../entitys/chatting.entity";
import { WsJwtGuard } from "../auth/guards/auth.wsjwtguard";
import { Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { GetWsUser } from "@src/auth/deco/auth.decorator";
import { RoomType } from "./dto/room.dto";
import { CacheAction } from "@src/common/decorator/cache-decorator";
import { ReadBy } from "../entitys/readby.entity";
import { SendMessageCacheInterceptor } from "./interceptors/chatting.sendmessage.cache.interceptor";

@WebSocketGateway({ cors: true })
@UseGuards(WsJwtGuard)
export class ChattingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chattingService: ChattingService,
    private readonly roomService: RoomService
  ) {}

  @WebSocketServer()
  server: Server;

  public async handleConnection(
    @ConnectedSocket() client: Socket
  ): Promise<void> {}

  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    if (client.data.rooms) {
      client.data.rooms.forEach((roomId: string) => {
        client.leave(roomId);
      });
    }
  }

  @SubscribeMessage("Join")
  async enterRoom(
    @ConnectedSocket() client: Socket,
    @GetWsUser() user: User
  ): Promise<void> {
    const participants = await this.roomService.GetParticipants(user);
    participants.forEach((participant) => {
      client.join(String(participant.room.id));
    });
  }

  @SubscribeMessage("Leave")
  leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string
  ): void {}

  @SubscribeMessage("SendMessage")
  @UseInterceptors(SendMessageCacheInterceptor)
  async handleMessage(
    @GetWsUser() user: User,
    @MessageBody() message: RequestMessage
  ): Promise<ResponseMessage> {
    // 여기에도 캐싱전략이 들어갔으면 좋겠음. (방 정보를 바로바로 최신화 )
    const room: Room = await this.roomService.getRoombyID(message.room_id);
    room.last_chat = message.message;
    await this.roomService.updateRoomStatus(room);

    const not_read_chat: number =
      room.type !== RoomType.Individual ? room.participant.length : 0;
    const ChattingMessage: Chatting = await this.chattingService.createChatting(
      message,
      user,
      room
    );
    const responseMessage: ResponseMessage = {
      id: ChattingMessage.id,
      room_id: room.id,
      user_id: user.id,
      message: message.message,
      not_read_chat,
      createdAt: ChattingMessage.createdAt,
    };

    this.server
      .to(String(message.room_id))
      .emit("SendMessage", responseMessage);

    return responseMessage;
  }

  @SubscribeMessage("ReadSingle")
  async readMessage(
    @GetWsUser() user: User,
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
      (readBy) => readBy.user.id === user.id
    );

    if (!alreadyRead) {
      // not_read_chat 값을 1 감소시킵니다.
      chattingMessage.not_read_chat -= 1;

      // ReadBy 엔터티에 사용자 정보를 추가합니다.
      const readBy = new ReadBy();
      readBy.user = user;
      readBy.chatting = chattingMessage;

      chattingMessage.readBys.push(readBy);

      await this.chattingService.updateChatting(chattingMessage);
    }

    const response: ResponseSingleRead = {
      id: chattingMessage.id,
      user_id: user.id,
    };

    this.server
      .to(String(chattingMessage.room.id))
      .emit("ReadSingle", response);

    return response;
  }

  @SubscribeMessage("ReadMulti")
  async readMultiMessage(
    @GetWsUser() user: User,
    @MessageBody() message: RequestMultiRead
  ): Promise<ResponseMultiRead> {
    // roomId를 기준으로 채팅 메시지들을 가져옵니다.
    const chattings = await this.chattingService.findChattingsByRoomId(
      message.id
    );
    const readChattingIds: number[] = [];

    for (let chattingMessage of chattings) {
      // 사용자가 이미 이 메시지를 읽었는지 확인합니다.
      const alreadyRead = chattingMessage.readBys.some(
        (readBy) => readBy.user.id === user.id
      );

      if (!alreadyRead) {
        // not_read_chat 값을 1 감소시킵니다.
        chattingMessage.not_read_chat -= 1;

        // ReadBy 엔터티에 사용자 정보를 추가합니다.
        const readBy = new ReadBy();
        readBy.user = user;
        readBy.chatting = chattingMessage;

        chattingMessage.readBys.push(readBy);

        await this.chattingService.updateChatting(chattingMessage);
        readChattingIds.push(chattingMessage.id);
      }
    }

    const response: ResponseMultiRead = {
      id: readChattingIds,
      user_id: user.id,
    };

    this.server.to(String(message.id)).emit("ReadMulti", response);

    return response;
  }
}
