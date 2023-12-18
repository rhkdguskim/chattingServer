import {ParticipantEntity} from "@app/chat/entity/participant.entity";

export interface ParticipantService {
    getParticipantsByUserID(id : number): Promise<ParticipantEntity[]>
    getParticipantsByRoomID(id : number) : Promise<ParticipantEntity[]>
}
