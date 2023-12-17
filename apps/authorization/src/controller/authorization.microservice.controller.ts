import { Controller, Get, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AUTHORIZATION_SERVICE } from "../authorization.metadata";
import {AuthorizationService} from "../providers/authorization.service.interface";
import {JWTRequest, JWTResponse, TokenResponse} from "../dto/authorization.dto";
import {JWT_SIGN, JWT_VERIFY} from "../authorization.message";
import {AuthorizationController} from "@app/authorization/controller/authorization.controller.interface";
import { OAuthData } from "@app/common/dto/oauth.dto";

@Controller()
export class AuthorizationMicroserviceController implements AuthorizationController {
  constructor(
      @Inject(AUTHORIZATION_SERVICE)
      private readonly authorizationService: AuthorizationService
  ) {
  }
  
  refreshToken(token: string): Promise<TokenResponse> {
        throw new Error("Method not implemented.");
    }
    oAuthKakao(data: OAuthData): Promise<TokenResponse> {
        throw new Error("Method not implemented.");
    }
    oAuthNaver(data: OAuthData): Promise<TokenResponse> {
        throw new Error("Method not implemented.");
    }
    oAuthGoogle(data: OAuthData): Promise<TokenResponse> {
        throw new Error("Method not implemented.");
    }

  @MessagePattern({ cmd: JWT_VERIFY })
  async verify(payload: string): Promise<JWTResponse> {
    return this.authorizationService.verify(payload);
  }
  @MessagePattern({ cmd: JWT_SIGN })
  async sign(payload: JWTRequest): Promise<TokenResponse> {
    return this.authorizationService.sign(payload);
  }
}
