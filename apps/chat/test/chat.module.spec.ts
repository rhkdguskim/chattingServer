import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import { ChatService } from "@app/chat/providers/chat.service.interface";
import { CHAT_SERVICE } from "@app/chat/chat.metadata";
import { ChatServiceModule } from "@app/chat/module/chat.service.module";
import { ChattingResponse, ChatType } from "@app/chat/dto/chat.dto";
import { ChatEntity } from "@app/chat/entity/chatting.entity";

describe("Chat Service Test", () => {
  let chatService: ChatService;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeOrmConfig), ChatServiceModule],
    }).compile();

    chatService = app.get<ChatService>(CHAT_SERVICE);
  });

  it("should be defined", () => {
    expect(chatService).toBeDefined();
  });

  describe("Chat Service Test", () => {
    it("add Chatting", async () => {
      for (let i = 0; i < 100; i++) {
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
});
