import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "@app/common/config";
import { JWTResponse, LoginUserResponse } from "@app/common/dto";

@Injectable()
export class AuthorizationService {
  constructor(private jwtService: JwtService) {}

  async verify(authToken: string): Promise<JWTResponse> {
    return await this.jwtService.verifyAsync<JWTResponse>(authToken, {
      secret: JWT_SECRET,
    });
  }
  async sign(payload): Promise<LoginUserResponse> {
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
}
