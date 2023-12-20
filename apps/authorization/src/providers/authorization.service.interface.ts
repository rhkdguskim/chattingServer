import { TokenInfoRequest, TokenInfoResponse } from "../dto/authorization.dto";
import { LoginUserResponse } from "@app/authentication/dto/authenticaion.dto";

export interface AuthorizationService {
  verify(payload: string): Promise<TokenInfoResponse>;
  sign(payload: TokenInfoRequest): Promise<LoginUserResponse>;
}
