import { Repository } from "typeorm";
import { CreateRoomReqeust, CreateRoomResponse, RoomType } from "../dto/room.dto";
import { Room } from "@src/entitys/room.entity";
import { ForbiddenException } from "@nestjs/common";

export function ValidateCreateRoom() {
    return function (target: any, property: string, descriptor: PropertyDescriptor) {
      // descriptor.value는 test() 함수 자체를 가리킨다. 이 함수를 잠시 변수에 피신 시킨다.
      const originMethod : Function = descriptor.value; 
  
      // 그리고 기존의 test() 함수의 내용을 다음과 같이 바꾼다.
      descriptor.value = async function (createRoomDto: CreateRoomReqeust, user_id: number) : Promise<CreateRoomResponse> {
        const participantCount = createRoomDto.participant.length;
        let roomType: RoomType;
        if (participantCount === 1) {
            this.logger.log("개인방을 생성합니다.");
            roomType = RoomType.Individual;
        } else if (participantCount === 2) {
            this.logger.log("1:1 채팅방을 생성합니다.");
            roomType = RoomType.two;
        } else if (participantCount >= 3) {
            this.logger.log("그룹채팅방 생성합니다.");
            roomType = RoomType.Group;
        } else {
            throw new ForbiddenException(
            "참가자가 없는 채팅방은 생성 할 수 없습니다."
            );
        }

        if (roomType == RoomType.two || roomType == RoomType.Individual)
        {
            const roomRepository : Repository<Room> = this.roomRepository;
        
            const { participant } = createRoomDto;

            const participantIds = participant.map((p) => p.id);
            const alreadyRoom = await roomRepository
            .createQueryBuilder("room")
            .innerJoinAndSelect("room.participant", "participant")
            .innerJoinAndSelect("participant.user", "user")
            .where("room.type = :roomType", { roomType })
            .andWhere("user.id IN (:...participantIds)", { participantIds }) // AND 조건으로 추가
            .andWhere("user.id = :user_id", {user_id})
            .getOne();

            if (alreadyRoom)
            {
                this.logger.log("이미 생성된 채팅방입니다.");
                const createroomResponse : CreateRoomResponse = {
                    ...alreadyRoom,
                    room_name : alreadyRoom.participant[0].room_name,
                }
                console.log(createroomResponse)
                return createroomResponse;
            }
        }
        
        originMethod.bind(this, createRoomDto, user_id); // 생성이 안되었다면 Room을 생성한다.
      };
    };
  }