import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";
import * as config from "config";
import { KakaoUserResponse } from "@src/auth/dto/kakao.auth.dto";
import { OAuthData } from "@src/auth/dto/OAuth.dto";

const kakao = config.get("kakao");
export class JwtKakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor(

  ) {
    super({
      clientID : kakao.restApiKey,
      clientSecret: kakao.secret,
      callbackURL: kakao.redirectURL,
      scope: ["account_email", "profile_nickname"],
    });
  }

  async validate(access_token: string, refresh_token: string, profile: any, done) {
    const user : KakaoUserResponse = profile._json

    const response : OAuthData = {
        access_token,
        refresh_token,
        user : {
            user_id : user.kakao_account.email,
            password : String(user.id),
            name : user.kakao_account.name,
        },
    }
    return done(null, response)
  }
}