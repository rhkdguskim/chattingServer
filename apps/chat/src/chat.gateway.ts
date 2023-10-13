import {Inject, UseGuards, UseInterceptors} from "@nestjs/common";
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
import { RequestMessage, ResponseMessage, RequestMultiRead, RequestSingleMessage,
  ResponseMultiRead,
  ResponseSingleRead, } from "@app/common/dto/chat";
import { RoomType } from "@app/common/dto/room.dto";
import { User} from "@app/common/entity";
import { Room} from "@app/common/entity";
import {Chatting, Participant} from "@app/common/entity";

import { Socket } from "socket.io";
import { GetWsUser } from "@app/common/decoration/auth.decorator";
import { ReadBy} from "@app/common/entity";
import {FIND_ALL_PARTICIPANT, FIND_ROOM, ROOM_SERVICE, UPDATE_ROOM} from "@app/common/message/room";
import {ClientProxy} from "@nestjs/microservices";
import {ChatService} from "./chat.service";
import {lastValueFrom} from "rxjs";

@WebSocketGateway({ cors: true })
//@UseGuards(WsJwtGuard)
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chattingService: ChatService,
    @Inject(ROOM_SERVICE)
    private readonly roomService: ClientProxy
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
    const participants : Participant[] = await lastValueFrom(this.roomService.send({cmd:FIND_ALL_PARTICIPANT},user))
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
  async handleMessage(
    @GetWsUser() user: User,
    @MessageBody() message: RequestMessage
  ): Promise<ResponseMessage> {
    // 여기에도 캐싱전략이 들어갔으면 좋겠음. (방 정보를 바로바로 최신화 )
    const room: Room = await lastValueFrom(this.roomService.send({cmd:FIND_ROOM},{id : message.room_id}));
    room.last_chat = message.message;
    await lastValueFrom(this.roomService.send({cmd:UPDATE_ROOM},room));

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
      room_id: chattingMessage.room.id,
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
