import { UserResponse } from "@app/common/dto";
import { FindFriendAllRequest, CreateFriendRequest, CreateFriendResponse, DelteFriendRequest } from "@app/common/dto/friend.createfriend.dto";
import { FriendTypeORM } from "@app/common/typeorm/entity";
import { IFriendClient } from "../friend.interface.client";

export class FriendLocalClient implements IFriendClient {
    findAllFriend(payload: FindFriendAllRequest): Promise<UserResponse[]> {
        throw new Error("Method not implemented.");
    }
    addFriend(payload: CreateFriendRequest): Promise<CreateFriendResponse> {
        throw new Error("Method not implemented.");
    }
    updateFriend(payload: CreateFriendRequest): Promise<FriendTypeORM> {
        throw new Error("Method not implemented.");
    }
    deleteFriend(payload: DelteFriendRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }

}