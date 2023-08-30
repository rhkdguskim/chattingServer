import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as config from "config";
import { UsersService } from "@src/users/users.service";
import { User } from "@src/users/users.entity";
import { Request } from "express";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache, // CacheManager 추가
    @Inject(Logger)
    private readonly logger: LoggerService
  ) {
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
    let user: User;
    const cachedData = await this.cacheManager.get<any>(`login/${id}`);
    if (cachedData) {
      // 캐시가 있다면 메모리 조회
      user = cachedData;
    } else {
      // 캐시가 없다면 DB조회
      user = await this.userService.findOne(id);
      // 패스워드 정보는 보내지 않는다.
      user.password = "";
      await this.cacheManager.set(`login/${id}`, user);
    }

    if (!user) {
      this.logger.error("권한에러");
      throw new UnauthorizedException();
    }

    return user;
  }
}
