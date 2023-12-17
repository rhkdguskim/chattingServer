import {Room} from "@app/chat/entity/room.entity";
import {Repository} from "@app/common/interface/repository.interface";

export interface RoomRepository extends Repository<Room> {
    findOne(id : number) : Promise<Room>
}