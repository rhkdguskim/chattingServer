import { Inject, Injectable } from "@nestjs/common";
import { JWT_SERVICE } from "../authorization.metadata";
import { AuthorizationService } from "./authorization.service.interface";
import { TokenInfoRequest, TokenInfoResponse } from "../dto/authorization.dto";
import { JwtServiceImpl } from "@app/common/auth/jwt/jwtServiceImpl";
import { LoginUserResponse } from "@app/authentication/dto/authenticaion.dto";
import {
  ServerException,
  ServerExceptionCode,
} from "@app/common/exception/server.exception";

@Injectable()
export class AuthorizationServiceImpl implements AuthorizationService {
  constructor(@Inject(JWT_SERVICE) private jwtService: JwtServiceImpl) {}

  async verify(payload: string): Promise<TokenInfoResponse> {
    return new TokenInfoResponse(await this.jwtService.verify(payload));
  }

  async sign(payload: TokenInfoRequest): Promise<LoginUserResponse> {
    try {
      return new LoginUserResponse(await this.jwtService.sign(payload));
    } catch (e) {
      throw new ServerException({
        code: ServerExceptionCode.Authorization,
        message: "Authorization Error",
      });
    }
  }
}
