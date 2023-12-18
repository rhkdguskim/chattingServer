import {Inject} from "@nestjs/common";
import {EntityManager} from "typeorm";
import {CreateRoomReqeust, CreateRoomResponse, InviteRoomRequest, RoomListResponse,} from "@app/chat/dto/room.dto";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {UserInfoResponse} from "@app/authentication/dto/authenticaion.dto";
import {RoomTransactionRepository} from "@app/chat/repository/room.repository.interface";
import { RoomEntity } from "../entity/room.entity";

export class RoomTypeormTransactionRepository implements RoomTransactionRepository {
    constructor(@Inject(EntityManager) private readonly manager: EntityManager) {
    }

    async countParticipantsByRoomID(id: number): Promise<number> {
        return await this.manager
            .getRepository(ParticipantTypeORM)
            .count({
                where: {
                    room: {id}}})
    }

    async getRoomByID(id: number): Promise<RoomEntity> {
        return await this.manager
            .getRepository(RoomTypeORM)
            .findOne({where : {id}})
    }

    async updateRoom(room: RoomEntity): Promise<boolean> {
        const result = await this.manager
            .getRepository(RoomTypeORM)
            .update(room.id,room);

        return result.affected >= 1
    }

    async getParticipantByUserID(id: number): Promise<ParticipantTypeORM[]> {
        return await this.manager.transaction(async (transactionalEntityManager) => {
            return await this.GetParticipantsByUserIDTransactional(id, transactionalEntityManager);
        })
    }

    async getParticipantByRoomID(id: number): Promise<ParticipantTypeORM[]> {
        return await this.manager.transaction(async (transactionalEntityManager) => {
            return await this.GetParticipantsByRoomIDTransactional(id, transactionalEntityManager);
        })
    }

    async getUserRoom(user_id: number): Promise<Array<RoomListResponse>> {
        return await this.manager.transaction(async transactionalEntityManager => {
            const myRoomList = await this.GetParticipantsByUserIDTransactional(user_id, transactionalEntityManager)

            const response: Array<RoomListResponse> = await Promise.all(
                myRoomList.map(async (participant) => {
                    const result = await this.GetParticipantsByRoomIDTransactional(participant.room.id, transactionalEntityManager);

                    const userList: Array<UserInfoResponse> = result.map(newresult => {
                        const user = newresult.user;
                        return {
                            id: user.id,
                            name: user.name,
                            user_id: user.user_id,
                            status_msg: user.status_msg,
                            profile_img_url: user.profile_img_url,
                            background_img_url: user.background_img_url,
                        };
                    });

                    return {
                        id: participant.room.id,
                        room_name: participant.room_name,
                        type: participant.room.type,
                        owner_id: participant.room.owner_id,
                        last_chat: participant.room.last_chat,
                        not_read_chat: 0,
                        last_read_chat_id: 0,
                        updatedAt: participant.room.updatedAt,
                        participant: userList,
                    };
                })
            );

            return response;
        });
    }

    async inviteRoom(inviteToRoomDto: InviteRoomRequest): Promise<ParticipantTypeORM[]> {
        let results: ParticipantTypeORM[] = [];
        const {room, room_name, participants} = inviteToRoomDto;

        await this.manager.transaction(async (transactionalEntityManager) => {
            for (const user of participants) {
                const instance = transactionalEntityManager.create(ParticipantTypeORM, {user, room, room_name})
                const participant = await transactionalEntityManager.save(ParticipantTypeORM, instance)
                results.push(participant);
            }
        })
        return results
    }


    async createRoom(createRoomDto: CreateRoomReqeust): Promise<CreateRoomResponse> {
        return await this.manager.transaction(
            async (transactionalEntityManager) => {
                const newRoom: RoomTypeORM = transactionalEntityManager.create(
                    RoomTypeORM,
                    {
                        owner_id: createRoomDto.id,
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
                const roomResponse: CreateRoomResponse = {
                    ...createdRoom,
                    room_name: createRoomDto.room_name,
                };
                return roomResponse;
            }
        );
    }

    private async GetParticipantsByRoomIDTransactional(id : number, transactionalEntityManager : EntityManager) : Promise<ParticipantTypeORM[]> {
        return await transactionalEntityManager
            .getRepository(ParticipantTypeORM)
            .createQueryBuilder("participant")
            .where("participant.room_id = :id", {id})
            .innerJoinAndSelect("participant.user", "user")
            .getMany();
    }

    private async GetParticipantsByUserIDTransactional(id : number, transactionalEntityManager: EntityManager) : Promise<ParticipantTypeORM[]> {
        return await transactionalEntityManager
            .getRepository(ParticipantTypeORM)
            .createQueryBuilder("participant")
            .where("participant.user_id = :id", {id})
            .innerJoinAndSelect("participant.room", "room")
            .getMany();
    }

}