import { Test, TestingModule } from "@nestjs/testing";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";

describe("FriendController", () => {
  let friendController: FriendController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FriendController],
      providers: [FriendService],
    }).compile();

    friendController = app.get<FriendController>(FriendController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(friendController.getHello()).toBe("Hello World!");
    });
  });
});
