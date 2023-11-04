import {
  LoginUserResponse,
  JWTRequest,
  JWTResponse,
} from "@app/common/dto/users.dto";
import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IAuthorizaionClient } from "../authorization.interface.client";
import { JWT_SIGN, JWT_VERIFY } from "../../message/authorization";

export class AuthorizaionTCPClient
  extends ClientTCP
  implements IAuthorizaionClient
{
  constructor(options: TcpClientOptions["options"]) {
    super(options);
  }
  Verify(payload: string): Promise<JWTResponse> {
    return lastValueFrom<JWTResponse>(
      this.send<JWTResponse>({ cmd: JWT_VERIFY }, payload)
    );
  }
  Sign(payload: JWTRequest): Promise<LoginUserResponse> {
    return lastValueFrom<LoginUserResponse>(
      this.send<LoginUserResponse>({ cmd: JWT_SIGN }, payload)
    );
  }
}
