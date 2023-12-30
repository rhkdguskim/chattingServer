import { JwtModuleOptions } from "@nestjs/jwt/dist/interfaces";
import { JwtService } from "@nestjs/jwt";
import {
  TokenInfoRequest,
  TokenInfoResponse,
} from "@app/authorization/dto/authorization.dto";
import { LoginUserResponse } from "@app/authentication/dto/authenticaion.dto";

export interface CommonJwtConfig {
  secret: string;
  expire_in: string;
}

export class JwtServiceImpl {
  private jwtService: JwtService;
  private option: JwtModuleOptions;
  constructor(options?: CommonJwtConfig) {
    const opt: JwtModuleOptions = {
      secret: options.secret,
      signOptions: {
        expiresIn: options.expire_in,
      },
    };
    this.option = opt;
    this.jwtService = new JwtService(opt);
  }

  async verify(payload: string): Promise<TokenInfoResponse> {
    return await this.jwtService.verifyAsync<TokenInfoResponse>(payload, {
      secret: this.option.secret,
    });
  }

  async sign(payload: TokenInfoRequest): Promise<LoginUserResponse> {
    const access_token: string = await this.jwtService.signAsync({
      ...payload,
    });
    const refresh_payload = {
      ...payload,
      refresh_token: true,
    };
    const refresh_token: string = await this.jwtService.signAsync(
      refresh_payload
    );

    return new LoginUserResponse({
      access_token,
      refresh_token,
    });
  }
}
