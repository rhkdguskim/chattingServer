import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {
  TokenInfoRequest,
  TokenInfoResponse,
} from "@app/auth/dto/authorization.dto";
import { JWT_SIGN, JWT_VERIFY } from "@app/auth/authorization.message";
import { AuthorizationService } from "./authorization.service.interface";
import { LoginUserResponse } from "@app/auth/dto/authenticaion.dto";

export class AuthorizationMicroService implements AuthorizationService {
  private clientAdaptor: ClientTCP;

  constructor(options: TcpClientOptions) {
    this.clientAdaptor = new ClientTCP(options["options"]);
  }

  sign(payload: TokenInfoRequest): Promise<LoginUserResponse> {
    throw lastValueFrom<TokenInfoResponse>(
      this.clientAdaptor.send<TokenInfoResponse>({ cmd: JWT_SIGN }, payload)
    );
  }

  verify(payload: string): Promise<TokenInfoResponse> {
    return lastValueFrom<TokenInfoResponse>(
      this.clientAdaptor.send<TokenInfoResponse>({ cmd: JWT_VERIFY }, payload)
    );
  }
}
