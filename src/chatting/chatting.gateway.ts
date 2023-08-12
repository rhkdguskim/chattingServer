import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChattingService } from './chatting.service';
import { JoinRoom, RequestMessage, ResponseMessage } from './dto/chatting.message.dto';
import { User } from 'src/users/users.entity';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { Chatting } from './chatting.entity';
import { WsJwtGuard } from '../auth/auth.wsjwtguard';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GetWsUser } from 'src/auth/get-user.decorator';

@WebSocketGateway({ cors: true })
@UseGuards(WsJwtGuard)
export class ChattingGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly chattingService: ChattingService,
    private readonly roomService : RoomService,
    ) {}

  @WebSocketServer()
  server: Server;

  public async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
    Logger.log("Client Enter")
  }

  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    if (client.data.rooms) {
      client.data.rooms.forEach((roomId: string) => {
        client.leave(roomId);
      });
    }
  }

  @SubscribeMessage('Join')
  async enterRoom(@ConnectedSocket() client: Socket, @GetWsUser() user:User,): Promise<void>  {
    const participants = await this.roomService.GetParticipants(user)
    participants.forEach( (participant) => {
      client.join(String(participant.room.id));
    })
  }

  @SubscribeMessage('Leave')
  leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string): void  {

  }

  @SubscribeMessage('SendMessage')
  async handleMessage(@GetWsUser() user:User, @MessageBody() message: RequestMessage): Promise<void>  {
    const room : Room = await this.roomService.getRoom(message.room_id);
    room.last_chat = message.message;
    console.log(room.last_chat)
    await this.roomService.updateRoomStatus(room);

    const ChattingMessage : Chatting = await this.chattingService.createChatting(message, user, room);
    const responseMessage : ResponseMessage = {id:ChattingMessage.id,
                                              room_id:room.id,
                                              user_id:user.id,
                                              message:message.message,
                                              not_read_chat:ChattingMessage.not_read,
                                              createdAt:ChattingMessage.createdAt }
    this.server.to(String(message.room_id)).emit('SendMessage', responseMessage);
  }
}
