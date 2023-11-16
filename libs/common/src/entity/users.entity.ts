import { Friend } from "./friend.entity";
import { Chatting } from "./chatting.entity";
import { Participant } from "./participant.entity";

export interface User {
  id: number;
  user_id: string;
  password: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
  background_img_url: string;
  createdAt: Date;
  updateAt: Date;
  friends: Friend[];
  chatting: Chatting[];
  participant: Participant[];
  refreshToken: string;
  accessToken: string;
  oauth_refreshToken: string;
  oauth_accessToken: string;
  refreshTokenExpiry: Date;
}
