import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as config from "config";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.entity";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get("jwt.secret"),

      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.jwt;
        },
      ]),
    });
  }

  async validate(payload): Promise<User> {
    const { id } = payload;
    const user: User = await this.userService.findOne(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    // 패스워드 정보는 보내지 않는다.
    user.password = "";

    return user;
  }
}
