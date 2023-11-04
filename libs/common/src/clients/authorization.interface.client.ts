import { JWTRequest, JWTResponse, LoginUserResponse } from "../dto";

export interface IAuthorizaionClient {
  Verify(payload: string): Promise<JWTResponse>;
  Sign(payload: JWTRequest): Promise<LoginUserResponse>;
}
