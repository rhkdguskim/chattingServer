import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway({cors: { origin: '*' }, path: 'chatting'})

//@UseGuards(AuthGuard())
export class ChattingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  client: Record<string, any>;
  constructor() {
      this.client = {};
  }

  @WebSocketServer()
  server: Server;

  public handleConnection(client): void {
    console.log('hi');
    client['id'] = String(Number(new Date()));
    client['nickname'] = '낯선남자' + String(Number(new Date()));
    this.client[client['id']] = client;
  }

  public handleDisconnect(client): void {
      console.log('bye', client['id']);
      delete this.client[client['id']];
  }
  
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string,
  @ConnectedSocket() client: Socket): string {
    console.log(data)
    return 'Hello world!';
  }
}
