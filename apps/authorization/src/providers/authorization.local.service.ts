import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OauthServiceFactory } from "./oauth.factory.service";
import {
  JWT_SERVICE,
  OAUTH_FACTORY_SERVICE,
} from "../authorization.metadata";
import {AuthorizationService} from "./authorization.service.interface";
import {JWTRequest, JWTResponse, TokenResponse} from "../dto/authorization.dto";

export class AuthorizationLocalService implements AuthorizationService {
  constructor(
    @Inject(JWT_SERVICE) private jwtService: JwtService,
    @Inject(OAUTH_FACTORY_SERVICE)
    private OAuthServiceFactory: OauthServiceFactory
  ) {}

  async verify(payload: string): Promise<JWTResponse> {
    return await this.jwtService.verifyAsync<JWTResponse>(payload);
  }

  async sign(payload: JWTRequest): Promise<TokenResponse> {
    const access_token: string = await this.jwtService.signAsync(payload);
    const refresh_payload = {
      ...payload,
      refresh_token: true,
    };
    const refresh_token: string = await this.jwtService.signAsync(
      refresh_payload
    );
    return { access_token, refresh_token };
  }

  async refreshVerify(payload: string): Promise<TokenResponse> {
    const response: JWTResponse =
      await this.jwtService.verifyAsync<JWTResponse>(payload);

    return await this.sign({
      id: response.id,
      user_id: response.user_id,
    });
  }
}
