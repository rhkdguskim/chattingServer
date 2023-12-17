import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver";
import { OAuthData } from "@app/authorization/dto/oauth.dto";
import * as config from "config";

interface Naver {
  restApiKey : string,
  secret : string,
  redirectURL: string,
}

const naver = config.get<Naver>("naver");
export class JwtNaverStrategy extends PassportStrategy(Strategy, "naver") {
  constructor() {
    super({
      clientID: naver.restApiKey,
      clientSecret: naver.secret,
      callbackURL: naver.redirectURL,
    });
  }

  validate(access_token: string, refresh_token: string, profile: any, done) {
    const user = profile._json;
    const response: OAuthData = {
      access_token,
      refresh_token,
      user: {
        user_id: user.email,
        password: profile.id,
        name: user.nickname,
      },
    };
    return done(null, response);
  }
}
