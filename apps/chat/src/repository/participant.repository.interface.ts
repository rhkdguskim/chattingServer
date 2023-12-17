import {Participant} from "@app/chat/entity/participant.entity";
import {Repository} from "@app/common/interface/repository.interface";

export interface ParticipantRepository extends Repository<Participant> {
    getParticipantsByRoomID(room_id : number) : Promise<Participant[]>
    getParticipantCountByRoomID(id : number) : Promise<number>;
    getParticipantsByUserID(user_id : number) : Promise<Participant[]>
}