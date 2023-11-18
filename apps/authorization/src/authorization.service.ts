import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTRequest, JWTResponse, LoginUserResponse } from "@app/common/dto";
import { OauthServiceFactory } from "./oauth.factory.service";
import {
  AuthorizationService,
  JWT_SERVICE,
  OAUTH_FACTORY_SERVICE,
} from "./authorization.interface";

export class AuthorizationServiceImpl implements AuthorizationService {
  constructor(
    @Inject(JWT_SERVICE) private jwtService: JwtService,
    @Inject(OAUTH_FACTORY_SERVICE)
    private OAuthServiceFactory: OauthServiceFactory
  ) {}

  async verify(payload: string): Promise<JWTResponse> {
    return await this.jwtService.verifyAsync<JWTResponse>(payload);
  }

  async sign(payload: JWTRequest): Promise<LoginUserResponse> {
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

  async refreshVerify(payload: string): Promise<LoginUserResponse> {
    // refresh_token에 담겨져있는 값들을 가지고 auth_token을 재발급 한다.
    const response: JWTResponse =
      await this.jwtService.verifyAsync<JWTResponse>(payload);

    return await this.sign({
      id: response.id,
      user_id: response.user_id,
    });
  }
}
