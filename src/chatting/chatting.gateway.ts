import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChattingService } from './chatting.service';
import { JoinRoom, RequestMessage, ResponseMessage } from './dto/chatting.message.dto';
import { User } from 'src/users/users.entity';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { Chatting } from './chatting.entity';
import { WsJwtGuard } from './chatting.wsjwtguard';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class ChattingGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly chattingService: ChattingService,
    private readonly roomService : RoomService
    ) {}

  @WebSocketServer()
  server: Server;

  public async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {

  }

  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    if (client.data.rooms) {
      client.data.rooms.forEach((roomId: string) => {
        client.leave(roomId);
      });
    }
  }

  @SubscribeMessage('Join')
  async enterRoom(@ConnectedSocket() client: Socket): Promise<void>  {
    const participants = await this.roomService.getRoomList(client.data.user)
    participants.forEach( (participant) => {
      client.join(String(participant.room.id));
    })
  }

  @SubscribeMessage('Leave')
  leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string): void  {

  }

  @SubscribeMessage('Message')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() message: RequestMessage): Promise<void>  {
    const user : User = client.data.user;
    
    const room : Room = await this.roomService.getRoom(message.room_id);
    const ChattingMessage : Chatting = await this.chattingService.createChatting(message, user, room);
    const responseMessage : ResponseMessage = {id:ChattingMessage.id,
                                              room_id:room.id,
                                              send_user_id:user.user_id,
                                              message:message.message,
                                              not_read_chat:ChattingMessage.not_read,
                                              createdAt:ChattingMessage.createdAt }
    this.server.to(String(message.room_id)).emit('getMessage', {
      message: responseMessage
    });
  }

  @SubscribeMessage('Read')
  async handleReadMessage(@ConnectedSocket() client: Socket, @MessageBody() message: RequestMessage): Promise<void>  {
    const user : User = client.data.user;
    
    const room : Room = await this.roomService.getRoom(message.room_id);
    const ChattingMessage : Chatting = await this.chattingService.createChatting(message, user, room);
    const responseMessage : ResponseMessage = {id:ChattingMessage.id,
                                              room_id:room.id,
                                              send_user_id:user.user_id,
                                              message:message.message,
                                              not_read_chat:ChattingMessage.not_read,
                                              createdAt:ChattingMessage.createdAt }
    this.server.to(String(message.room_id)).emit('getMessage', {
      message: responseMessage
    });
  }
}
