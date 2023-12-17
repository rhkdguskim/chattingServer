import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {
  ADD_FRIEND,
  DELETE_FRIEND,
  FIND_ALL_FRIEND,
  UPDATE_FRIEND,
} from "../friend.message";
import {Friend} from "../entity/friend.entity";
import {FriendService} from "./friend.service.interface";
import {CreateFriendRequest, CreateFriendResponse, DelteFriendRequest} from "../dto/friend.dto";

export class FriendTCPClientService implements FriendService {
  private tcpClientAdaptor : ClientTCP;
  constructor(options: TcpClientOptions["options"]) {
    this.tcpClientAdaptor = new ClientTCP(options)
  }

  getFriends(id: number): Promise<Friend[]> {
    return lastValueFrom<Friend[]>( this.tcpClientAdaptor.send<Friend[]>({ cmd: FIND_ALL_FRIEND }, id))
    }
    getMyFriends(id: number): Promise<Friend[]> {
        throw new Error("Method not implemented.");
    }
    addFriend(createFriend: CreateFriendRequest): Promise<CreateFriendResponse> {
      return lastValueFrom<CreateFriendResponse>(this.tcpClientAdaptor.send<CreateFriendResponse>({ cmd: ADD_FRIEND }, createFriend))
    }
    delFriend(delFriend: DelteFriendRequest): Promise<any> {
      return lastValueFrom<Friend>(this.tcpClientAdaptor.send<Friend>({ cmd: DELETE_FRIEND }, delFriend));
    }
    changeFriendName(createFriend: CreateFriendRequest): Promise<Friend> {
      return lastValueFrom<Friend>(this.tcpClientAdaptor.send<Friend>({ cmd: UPDATE_FRIEND }, createFriend));
    }
}
