import {Repository} from "@app/common/interface/repository.interface";
import {User} from "../entity/users.entity";

export interface UserRepository extends Repository<User> {
    findOneByID(user_id: string): Promise<User>;
    findOne(id:number) : Promise<User>
}