import {Repository} from "@app/common/interface/repository.interface";
import {UserEntity} from "../entity/users.entity";

export interface UserRepository extends Repository<UserEntity> {
    findOneByID(user_id: string): Promise<UserEntity>;
    findOne(id:number) : Promise<UserEntity>
}