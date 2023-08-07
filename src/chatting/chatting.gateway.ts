import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway({cors: { origin: '*' }, path: 'chatting'})

@UseGuards(AuthGuard())
export class ChattingGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string,
  @ConnectedSocket() client: Socket): string {
    console.log(data)
    return 'Hello world!';
  }
}
