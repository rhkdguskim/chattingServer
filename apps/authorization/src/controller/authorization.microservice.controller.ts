import { Controller, Get, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AUTHORIZATION_SERVICE } from "../authorization.metadata";
import {AuthorizationService} from "../providers/authorization.service.interface";
import {JWTRequest, JWTResponse, TokenResponse} from "../dto/authorization.dto";
import {JWT_SIGN, JWT_VERIFY} from "../authorization.message";

@Controller()
export class AuthorizationMicroserviceController {
  constructor(
    @Inject(AUTHORIZATION_SERVICE)
    private readonly authorizationService: AuthorizationService
  ) {}

  @MessagePattern({ cmd: JWT_VERIFY })
  async verify(payload: string): Promise<JWTResponse> {
    return this.authorizationService.verify(payload);
  }
  @MessagePattern({ cmd: JWT_SIGN })
  async sign(payload: JWTRequest): Promise<TokenResponse> {
    return this.authorizationService.sign(payload);
  }
}
