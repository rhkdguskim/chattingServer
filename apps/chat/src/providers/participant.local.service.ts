import {ParticipantService} from "@app/chat/providers/participant.service.interface";
import {ParticipantEntity} from "@app/chat/entity/participant.entity";
import {Inject} from "@nestjs/common";
import {PARTICIPANT_REPOSITORY} from "@app/chat/chat.metadata";
import {ParticipantRepository} from "@app/chat/repository/participant.repository.interface";

export class ParticipantLocalService implements ParticipantService {

    constructor(@Inject(PARTICIPANT_REPOSITORY) private readonly participantRepository : ParticipantRepository) {
    }

    async getParticipantsByUserID(id : number): Promise<ParticipantEntity[]> {
        return await this.participantRepository.getParticipantsByUserID(id);
    }

    async getParticipantsByRoomID(id : number) : Promise<ParticipantEntity[]> {
        return await this.participantRepository.getParticipantsByRoomID(id);
    }

}