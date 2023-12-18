import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OauthServiceFactory } from "./oauth.factory.service";
import {
  JWT_SERVICE,
  OAUTH_FACTORY_SERVICE,
} from "../authorization.metadata";
import {AuthorizationService} from "./authorization.service.interface";
import {JWTRequest, JWTResponse} from "../dto/authorization.dto";
import {CommonJwtService} from "@app/common/auth/common.jwtService";
import {LoginUserResponse} from "@app/authentication/dto/authenticaion.dto";

export class AuthorizationLocalService implements AuthorizationService {
  constructor(
    @Inject(JWT_SERVICE) private jwtService: CommonJwtService,
    @Inject(OAUTH_FACTORY_SERVICE)
    private OAuthServiceFactory: OauthServiceFactory
  ) {}

  async verify(payload: string): Promise<JWTResponse> {
    return await this.jwtService.verify(payload);
  }

  async sign(payload: JWTRequest): Promise<LoginUserResponse> {
    return await this.jwtService.sign(payload);
  }
}
