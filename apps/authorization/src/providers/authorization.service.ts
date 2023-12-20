import { Inject } from "@nestjs/common";
import { JWT_SERVICE } from "../authorization.metadata";
import { AuthorizationService } from "./authorization.service.interface";
import { TokenInfoRequest, TokenInfoResponse } from "../dto/authorization.dto";
import { CommonJwtService } from "@app/common/auth/common.jwtService";
import { LoginUserResponse } from "@app/authentication/dto/authenticaion.dto";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";

export class AuthorizationServiceImpl implements AuthorizationService {
  constructor(@Inject(JWT_SERVICE) private jwtService: CommonJwtService) {}

  async verify(payload: string): Promise<TokenInfoResponse> {
    return new TokenInfoResponse(await this.jwtService.verify(payload));
  }

  async sign(payload: TokenInfoRequest): Promise<LoginUserResponse> {
    try {
      return new LoginUserResponse(await this.jwtService.sign(payload));
    } catch (e) {
      throw new ChatServerException({
        code: ChatServerExceptionCode.Authorization,
        message: "Authorization Error",
      });
    }
  }
}
