import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";
import { KakaoUserResponse } from "@app/auth/dto/authentication.kakao.dto";
import { OAUTH_CONFIG } from "@config/config.interface";

export class JwtKakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor() {
    super({
      clientID: OAUTH_CONFIG.kakao.apiKey,
      clientSecret: OAUTH_CONFIG.kakao.secret,
      callbackURL: OAUTH_CONFIG.kakao.redirect_url,
      scope: ["account_email", "profile_nickname"],
    });
  }

  async validate(
    access_token: string,
    refresh_token: string,
    profile: any,
    done
  ) {
    const user: KakaoUserResponse = profile._json;

    const response = {
      access_token,
      refresh_token,
      user: {
        user_id: user.kakao_account.email,
        password: String(user.id),
        name: user.kakao_account.name,
        status_msg: "",
      },
    };
    return done(null, response);
  }
}
