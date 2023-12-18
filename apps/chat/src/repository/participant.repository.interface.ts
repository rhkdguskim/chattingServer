import {ParticipantEntity} from "@app/chat/entity/participant.entity";
import {Repository} from "@app/common/interface/repository.interface";

export interface ParticipantRepository extends Repository<ParticipantEntity> {
    getParticipantsByRoomID(room_id : number) : Promise<ParticipantEntity[]>
    getParticipantCountByRoomID(id : number) : Promise<number>;
    getParticipantsByUserID(user_id : number) : Promise<ParticipantEntity[]>
}