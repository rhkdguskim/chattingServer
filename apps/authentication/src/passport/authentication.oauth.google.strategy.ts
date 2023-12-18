import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { OAuthData } from "@app/authorization/dto/oauth.dto";
import config from "config";

interface google {
  restApiKey : string,
  secret : string,
  redirectURL: string,
}

const google = config.get<google>("google");

export class JwtGoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: google.restApiKey,
      clientSecret: google.secret,
      callbackURL: google.redirectURL,
      scope: ["email", "profile"],
    });
  }

  async validate(
    access_token: string,
    refresh_token: string,
    profile: any,
    done
  ) {
    const user = profile._json;
    const response: OAuthData = {
      access_token,
      refresh_token,
      user: {
        user_id: user.email,
        password: String(profile.id),
        name: user.name,
      },
    };
    return done(null, response);
  }
}
