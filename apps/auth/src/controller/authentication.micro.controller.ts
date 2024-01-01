import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { SIGN_IN } from "../authentication.message";
import { AuthenticationService } from "../providers/authentication.service.interface";
import { AuthenticationController } from "./authentication.controller.interface";
import { AUTHENTICATION_SERVICE } from "../authentication.metadata";
import {
  LoginUserRequest,
  LoginUserResponse,
} from "@app/auth/dto/authenticaion.dto";

@Controller()
export class AuthenticationMicroController implements AuthenticationController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: AuthenticationService
  ) {}

  googleSignIn(oauthData: LoginUserRequest): Promise<LoginUserResponse> {
    throw new Error("Method not implemented.");
  }
  kakaoSignIn(oauthData: LoginUserRequest): Promise<LoginUserResponse> {
    throw new Error("Method not implemented.");
  }
  naverSignIn(oauthData: LoginUserRequest): Promise<LoginUserResponse> {
    throw new Error("Method not implemented.");
  }
  @MessagePattern({ cmd: SIGN_IN })
  async signIn(payload: LoginUserRequest): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(payload);
  }
}
