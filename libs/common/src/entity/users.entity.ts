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
  refresh_token: string;
  access_token: string;
  oauth_refresh_token: string;
  oauth_access_token: string;
  refresh_token_expire: Date;
}
