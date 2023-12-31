import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver";
import {OAUTH_CONFIG} from "@config/config.interface";

export class JwtNaverStrategy extends PassportStrategy(Strategy, "naver") {
  constructor() {
    super({
      clientID: OAUTH_CONFIG.naver.apiKey,
      clientSecret: OAUTH_CONFIG.naver.secret,
      callbackURL: OAUTH_CONFIG.naver.redirect_url,
    });
  }

  validate(access_token: string, refresh_token: string, profile: any, done) {
    const user = profile._json;
    const response = {
      access_token,
      refresh_token,
      user: {
        user_id: user.email,
        password: profile.id,
        name: user.nickname,
        status_msg: "",
      },
    };
    return done(null, response);
  }
}
