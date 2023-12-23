import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import { ChatService } from "@app/chat/providers/chat.service.interface";
import { CHAT_GATEWAY, CHAT_SERVICE } from "@app/chat/chat.metadata";
import { ChatServiceModule } from "@app/chat/module/chat.service.module";
import { ChattingResponse, ChatType } from "@app/chat/dto/chat.dto";
import { ChatEntity } from "@app/chat/entity/chatting.entity";
import { ChatGateway } from "@app/chat/gateway/chat.gateway.interface";

describe("Chat Service Test", () => {
  let chatService: ChatService;
  let chatGateway: ChatGateway;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeOrmConfig), ChatServiceModule],
    }).compile();

    chatService = app.get<ChatService>(CHAT_SERVICE);
    chatGateway = app.get<ChatGateway>(CHAT_GATEWAY);
  });

  it("should be defined", () => {
    expect(chatService).toBeDefined();
    expect(chatGateway).toBeDefined();
  });

  describe("Chat Service Test", () => {
    it("add Chatting", async () => {
      for (let i = 0; i < 1000; i++) {
        const result = await chatService.createChatting(1, {
          message: `안녕하세요 ${i}`,
          messageType: ChatType.text,
          room_id: 18,
        });

        expect(result).toBeInstanceOf(ChatEntity);
      }
    });

    it("read Chatting", async () => {
      for (let i = 0; i < 20; i++) {
        const chatting = await chatService.getChattingList({
          cursor: i * 50,
          id: 18,
        });
        expect(chatting).toBeInstanceOf(Array<ChattingResponse>);
      }
    });
  });

  // describe("Chatting Gateway Test", () => {
  //   const socket = io("ws://localhost:3000", {
  //     path: "/api/chat",
  //     transports: ["websocket"], // WebSocket 전송만 사용
  //   });
  //   chatGateway.joinRoom(1, socket);
  // });
});
