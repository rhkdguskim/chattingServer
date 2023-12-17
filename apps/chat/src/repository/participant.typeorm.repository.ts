import {TypeormRepository} from "@app/common/typeorm/typeormrepository";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {ParticipantRepository} from "@app/chat/repository/participant.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { Participant } from "../entity/participant.entity";
import {Room} from "@app/chat/entity/room.entity";

export class ParticipantTypeormRepository extends TypeormRepository<ParticipantTypeORM> implements ParticipantRepository {
    constructor(@InjectRepository(ParticipantTypeORM)
                private participantRepository: Repository<ParticipantTypeORM>
    ) {
        super(participantRepository);
    }

    async getParticipantCountByRoomID(id: number): Promise<number> {
        return await this.participantRepository.count({
            where: {
                room: {id},
            },
        });
    }

    async getParticipantsByRoomID(room_id: number): Promise<Participant[]> {
        return await this.participantRepository
            .createQueryBuilder("participant")
            .where("participant.room_id = :id", {id: room_id})
            .innerJoinAndSelect("participant.user", "user")
            .getMany();
    }
    async getParticipantsByUserID(user_id: number): Promise<Participant[]> {
        return await this.participantRepository
            .createQueryBuilder("participant")
            .where("participant.user_id = :id", {id: user_id})
            .innerJoinAndSelect("participant.room", "room")
            .getMany();
    }
}