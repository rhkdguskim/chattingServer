import { Test, TestingModule } from "@nestjs/testing";
import { RoomService } from "./room.service";

describe("ChattingService", () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomService],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
