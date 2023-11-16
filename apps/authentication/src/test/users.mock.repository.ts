import { User } from "@app/common/entity/users.entity";
import { UserRepository } from "apps/authentication/src/authentication.interface";

export class UserMockRepository implements UserRepository {
    findOneByID(user_id: string): Promise<User> {
        const mockUser: User = {
            id: 1,
            name: "Mock User",
            user_id,
            password: "test",
            status_msg: "안녕",
            profile_img_url: "",
            background_img_url: "",
            createdAt: undefined,
            updateAt: undefined,
            friends: [],
            chatting: [],
            participant: [],
            refreshToken: "",
            accessToken: "",
            oauth_refreshToken: "",
            oauth_accessToken: "",
            refreshTokenExpiry: undefined
        };

        return Promise.resolve(mockUser);
    }
    create(data: Partial<User>): Promise<User> {
        const mockData : User = {
            id: 0,
            user_id: "",
            password: "",
            name: "",
            status_msg: "",
            profile_img_url: "",
            background_img_url: "",
            createdAt: undefined,
            updateAt: undefined,
            friends: [],
            chatting: [],
            participant: [],
            refreshToken: "",
            accessToken: "",
            oauth_refreshToken: "",
            oauth_accessToken: "",
            refreshTokenExpiry: undefined
        }

        return Promise.resolve(mockData);
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string | number): Promise<User> {
        const number_id = id as number;
                const mockUser: User = {
            id : number_id,
            name: "Mock User",
            user_id : "MockUserID",
            password: "test",
            status_msg: "안녕",
            profile_img_url: "",
            background_img_url: "",
            createdAt: undefined,
            updateAt: undefined,
            friends: [],
            chatting: [],
            participant: [],
            refreshToken: "",
            accessToken: "",
            oauth_refreshToken: "",
            oauth_accessToken: "",
            refreshTokenExpiry: undefined
        };

        return Promise.resolve(mockUser);
    }
    update(id: string | number, data: Partial<User>): Promise<boolean | User> {
        throw new Error("Method not implemented.");
    }
    delete(id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}