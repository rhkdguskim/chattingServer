import { Repository } from "typeorm";
import {
  CreateRoomReqeust,
  CreateRoomResponse,
  RoomType,
} from "@app/common/dto/room.dto";
import { ForbiddenException } from "@nestjs/common";
import { RoomTypeORM } from "@app/common/typeorm/entity";

export function ValidateCreateRoom() {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    // descriptor.value는 test() 함수 자체를 가리킨다. 이 함수를 잠시 변수에 피신 시킨다.
    const originMethod: Function = descriptor.value;

    // 그리고 기존의 test() 함수의 내용을 다음과 같이 바꾼다.
    descriptor.value = async function (
      createRoomDto: CreateRoomReqeust,
      user_id: number
    ): Promise<CreateRoomResponse> {
      const participantCount = createRoomDto.participant.length;
      let roomType: RoomType;
      if (participantCount === 1) {
        roomType = RoomType.Individual;
      } else if (participantCount === 2) {
        roomType = RoomType.two;
      } else if (participantCount >= 3) {
        roomType = RoomType.Group;
      } else {
        throw new ForbiddenException(
          "참가자가 없는 채팅방은 생성 할 수 없습니다."
        );
      }

      if (roomType == RoomType.two || roomType == RoomType.Individual) {
        const roomRepository: Repository<RoomTypeORM> = this.roomRepository;

        const { participant } = createRoomDto;

        const participantIds = participant.map((p) => p.id);
        const alreadyRoom = await roomRepository
          .createQueryBuilder("room")
          .innerJoinAndSelect("room.participant", "participant")
          .innerJoinAndSelect("participant.user", "user")
          .where("room.type = :roomType", { roomType })
          .andWhere("user.id IN (:...participantIds)", { participantIds }) // AND 조건으로 추가
          .andWhere("user.id = :user_id", { user_id })
          .getOne();

        if (alreadyRoom != null) {
          this.logger.log("이미 생성된 채팅방입니다.");
          const createroomResponse: CreateRoomResponse = {
            ...alreadyRoom,
            room_name: alreadyRoom.participant[0].room_name,
          };
          return createroomResponse;
        }
      }
      originMethod.call(this, createRoomDto, user_id); // 생성이 안되었다면 Room을 생성한다.
    };
  };
}
