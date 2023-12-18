import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {
  ADD_FRIEND,
  DELETE_FRIEND,
  FIND_ALL_FRIEND,
  UPDATE_FRIEND,
} from "../friend.message";
import {FriendEntity} from "../entity/friend.entity";
import {FriendService} from "./friend.service.interface";
import {CreateFriendRequest, CreateFriendResponse, DeleteFriendRequest} from "../dto/friend.dto";

export class FriendTCPClientService implements FriendService {
  private tcpClientAdaptor : ClientTCP;
  constructor(options: TcpClientOptions["options"]) {
    this.tcpClientAdaptor = new ClientTCP(options)
  }

  getFriends(id: number): Promise<FriendEntity[]> {
    return lastValueFrom<FriendEntity[]>( this.tcpClientAdaptor.send<FriendEntity[]>({ cmd: FIND_ALL_FRIEND }, id))
    }
    getMyFriends(id: number): Promise<FriendEntity[]> {
        throw new Error("Method not implemented.");
    }
    addFriend(createFriend: CreateFriendRequest): Promise<CreateFriendResponse> {
      return lastValueFrom<CreateFriendResponse>(this.tcpClientAdaptor.send<CreateFriendResponse>({ cmd: ADD_FRIEND }, createFriend))
    }
    delFriend(delFriend: DeleteFriendRequest): Promise<any> {
      return lastValueFrom<FriendEntity>(this.tcpClientAdaptor.send<FriendEntity>({ cmd: DELETE_FRIEND }, delFriend));
    }
    changeFriendName(createFriend: CreateFriendRequest): Promise<FriendEntity> {
      return lastValueFrom<FriendEntity>(this.tcpClientAdaptor.send<FriendEntity>({ cmd: UPDATE_FRIEND }, createFriend));
    }
}
