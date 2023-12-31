import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import {OAUTH_CONFIG} from "@config/config.interface";
export class JwtGoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: OAUTH_CONFIG.google.apiKey,
      clientSecret: OAUTH_CONFIG.google.secret,
      callbackURL: OAUTH_CONFIG.google.redirect_url,
      scope: ["email", "profile"],
    });
  }

  async validate(access_token: string, refresh_token: string, profile, done) {
    const user = profile._json;
    const response = {
      access_token,
      refresh_token,
      user: {
        user_id: user.email,
        password: String(profile.id),
        name: user.name,
        status_msg: "",
      },
    };
    return done(null, response);
  }
}
