import { Inject } from "@nestjs/common";
import { EntityManager } from "typeorm";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  DeleteRoomRequest,
  InviteRoomRequest,
  ParticipantUserInfo,
  RoomInfoResponse,
} from "@app/chat/dto/room.dto";
import { RoomTypeORM } from "@lib/common/database/entity/room.typeorm.entity";
import { ParticipantTypeORM } from "@lib/common/database/entity/participant.typeorm.entity";
import { RoomRepository } from "@app/chat/repository/room.repository.interface";
import { RoomEntity } from "../entity/room.entity";

export class RoomTypeormRepository implements RoomRepository {
  constructor(@Inject(EntityManager) private readonly manager: EntityManager) {}

  async deleteRoom(deleteRoom: DeleteRoomRequest): Promise<boolean> {
    return await this.manager.transaction(
      async (transactionalEntityManager) => {
        const roomToDelete = await transactionalEntityManager.findOne(
          RoomTypeORM,
          { where: { id: deleteRoom.room_id } }
        );

        if (!roomToDelete) {
          return false;
        }

        await transactionalEntityManager.delete(ParticipantTypeORM, {
          room: roomToDelete,
        });

        await transactionalEntityManager.delete(RoomTypeORM, {
          where: { id: deleteRoom.room_id },
        });

        return true;
      }
    );
  }

  async getRoomInfoByParticipants(
    user_id: number,
    createRoom: CreateRoomRequest
  ): Promise<RoomTypeORM> {
    const { participant } = createRoom;
    const participantIds = participant.map((p) => p.id);

    return await this.manager.transaction(
      async (transactionalEntityManager) => {
        const rooms = await transactionalEntityManager
          .getRepository(RoomTypeORM)
          .createQueryBuilder("room")
          .innerJoinAndSelect("room.participants", "participant")
          .innerJoinAndSelect("participant.user", "user")
          .where("room.type = :roomType", { roomType: createRoom.room_type })
          .andWhere("participant.user IN (:...participantIds)", {
            participantIds,
          })
          .getMany();

        return rooms.find((room) => {
          const roomParticipantIds = room.participants.map(
            (participant) => participant.user.id
          );
          return (
            roomParticipantIds.length === participantIds.length &&
            participantIds.every((id) => roomParticipantIds.includes(id))
          );
        });
      }
    );
  }

  async countParticipantsByRoomID(id: number): Promise<number> {
    return await this.manager.getRepository(ParticipantTypeORM).count({
      where: {
        room: { id },
      },
    });
  }

  async find(id: number): Promise<RoomEntity> {
    return await this.manager
      .getRepository(RoomTypeORM)
      .findOne({ relations: ["participants"], where: { id } });
  }

  async update(room: Partial<RoomEntity>): Promise<boolean> {
    const result = await this.manager
      .getRepository(RoomTypeORM)
      .update(room.id, room);

    return result.affected >= 1;
  }

  async getParticipantByUserID(id: number): Promise<ParticipantTypeORM[]> {
    return await this.manager.transaction(
      async (transactionalEntityManager) => {
        return await this.GetParticipantsByUserIDTransactional(
          id,
          transactionalEntityManager
        );
      }
    );
  }

  async getParticipantByRoomID(id: number): Promise<ParticipantTypeORM[]> {
    return await this.manager.transaction(
      async (transactionalEntityManager) => {
        return await this.GetParticipantsByRoomIDTransactional(
          id,
          transactionalEntityManager
        );
      }
    );
  }

  async getRooms(user_id: number): Promise<Array<RoomInfoResponse>> {
    return await this.manager.transaction(
      async (transactionalEntityManager) => {
        const myRoomList = await this.GetParticipantsByUserIDTransactional(
          user_id,
          transactionalEntityManager
        );
        const response: Array<RoomInfoResponse> = await Promise.all(
          myRoomList.map(async (participant) => {
            const result = await this.GetParticipantsByRoomIDTransactional(
              participant.room.id,
              transactionalEntityManager
            );

            const userInfoList = result.map((newresult) => {
              const user = newresult.user;
              return new ParticipantUserInfo(user);
            });

            return new RoomInfoResponse({
              ...participant.room,
              not_read_chat: 0,
              last_read_chat_id: 0,
              participant: userInfoList,
            });
          })
        );

        return response;
      }
    );
  }

  async inviteToRoom(
    inviteToRoomDto: InviteRoomRequest
  ): Promise<ParticipantTypeORM[]> {
    const results: ParticipantTypeORM[] = [];
    const { room, room_name, participants } = inviteToRoomDto;

    await this.manager.transaction(async (transactionalEntityManager) => {
      for (const user of participants) {
        const instance = transactionalEntityManager.create(ParticipantTypeORM, {
          user,
          room,
          room_name,
        });
        const participant = await transactionalEntityManager.save(
          ParticipantTypeORM,
          instance
        );
        results.push(participant);
      }
    });
    return results;
  }

  async create(
    user_id: number,
    createRoomDto: CreateRoomRequest
  ): Promise<CreateRoomResponse> {
    return await this.manager.transaction(
      async (transactionalEntityManager) => {
        const newRoom: RoomTypeORM = transactionalEntityManager.create(
          RoomTypeORM,
          {
            room_name: createRoomDto.room_name,
            owner_id: user_id,
            type: createRoomDto.room_type,
            last_chat: "",
          }
        );
        const createdRoom: RoomTypeORM = await transactionalEntityManager.save(
          RoomTypeORM,
          newRoom
        );

        for (const participantUser of createRoomDto.participant) {
          const newParticipant = transactionalEntityManager.create(
            ParticipantTypeORM,
            {
              user: participantUser,
              room: createdRoom,
              room_name: createRoomDto.room_name,
            }
          );

          await transactionalEntityManager.save(
            ParticipantTypeORM,
            newParticipant
          );
        }
        return new CreateRoomResponse({
          ...createdRoom,
          room_name: createRoomDto.room_name,
        });
      }
    );
  }

  private async GetParticipantsByRoomIDTransactional(
    id: number,
    transactionalEntityManager: EntityManager
  ): Promise<ParticipantTypeORM[]> {
    return await transactionalEntityManager
      .getRepository(ParticipantTypeORM)
      .createQueryBuilder("participant")
      .where("participant.room_id = :id", { id })
      .innerJoinAndSelect("participant.user", "user")
      .getMany();
  }

  private async GetParticipantsByUserIDTransactional(
    id: number,
    transactionalEntityManager: EntityManager
  ): Promise<ParticipantTypeORM[]> {
    return await transactionalEntityManager
      .getRepository(ParticipantTypeORM)
      .createQueryBuilder("participant")
      .where("participant.user_id = :id", { id })
      .innerJoinAndSelect("participant.room", "room")
      .getMany();
  }
}
