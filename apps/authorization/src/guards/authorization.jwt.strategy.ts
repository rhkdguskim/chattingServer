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
import { Request } from "express";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { UserEntity } from "@app/authentication/entity/users.entity";
import {UserInfoResponse} from "@app/authentication/dto/authenticaion.dto";

@Injectable()
export class AuthorizationJwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private userService: UsersService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @Inject(Logger)
    private readonly logger: LoggerService
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get<any>("jwt.secret"),

      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.jwt;
        },
      ]),
    });
  }

  async validate(payload): Promise<UserInfoResponse> {
    const { id } = payload;
    let user: UserInfoResponse;
    const cachedData = await this.cacheManager.get<any>(`login/${id}`);
    if (cachedData) {
      // 캐시가 있다면 메모리 조회
      user = cachedData;
    } else {
      // 캐시가 없다면 DB조회
      user = await this.userService.findOne(id);
      // 패스워드 정보는 보내지 않는다.
      await this.cacheManager.set(`login/${id}`, user);
    }

    if (!user) {
      this.logger.error("권한에러");
      throw new UnauthorizedException();
    }

    return user;
  }
}
