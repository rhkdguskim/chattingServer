import { HttpService } from "@nestjs/axios";
import { Inject } from "@nestjs/common";
import { HTTP_SERVICE } from "./authorization.interface";
export interface OAuthService {
  token(code: string);
  userInfo(access_token: string);
}

export interface KakaoRequestToken {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
  client_secret: string;
}

export interface KakaoResponseToken {
  token_type: string;
  access_token: string;
  refresh_token: string;
}

export class KakaoOAuthService implements OAuthService {
  constructor(@Inject(HTTP_SERVICE) private httpService: HttpService) {}

  token(code: string) {
    const body: KakaoRequestToken = {
      grant_type: "authorization_code",
      client_id: "id",
      redirect_uri: "",
      code: "",
      client_secret: "",
    };
    const result = this.httpService.post(
      "https://kauth.kakao.com/oauth/token",
      body
    );
    return result;
  }

  userInfo(access_token: string) {
    const result = this.httpService.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return result;
  }
}
