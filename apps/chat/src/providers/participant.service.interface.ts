import {Participant} from "@app/chat/entity/participant.entity";

export interface ParticipantService {
    getParticipantsByUserID(id : number): Promise<Participant[]>
    getParticipantsByRoomID(id : number) : Promise<Participant[]>
}
