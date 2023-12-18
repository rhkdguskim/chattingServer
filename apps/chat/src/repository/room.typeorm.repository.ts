import {TypeormRepository} from "@app/common/typeorm/typeormrepository";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {RoomRepository} from "@app/chat/repository/room.repository.interface";
import { RoomEntity } from "../entity/room.entity";
import {InjectRepository} from "@nestjs/typeorm";

import {Repository} from "typeorm";

export class RoomTypeormRepository extends TypeormRepository<RoomTypeORM> implements RoomRepository {
    constructor(@InjectRepository(RoomTypeORM)
                private roomRepository: Repository<RoomTypeORM>
    ) {
        super(roomRepository);
    }

    async findOne(id: number): Promise<RoomEntity> {
        return await this.roomRepository.findOne({where: {id}});
    }
}