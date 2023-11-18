import { JWTResponse, JWTRequest, LoginUserResponse } from "@app/common/dto";
import { IAuthorizaionClient } from "../authorization.interface.client";

export class AuthorizaionLocalClient implements IAuthorizaionClient {
  Verify(payload: string): Promise<JWTResponse> {
    throw new Error("Method not implemented.");
  }
  Sign(payload: JWTRequest): Promise<LoginUserResponse> {
    throw new Error("Method not implemented.");
  }
}
