import {
  TokenInfoRequest,
  TokenInfoResponse,
} from "@app/auth/dto/authorization.dto";
import { LoginUserResponse } from "@app/auth/dto/authenticaion.dto";

export interface AuthorizationService {
  verify(payload: string): Promise<TokenInfoResponse>;
  sign(payload: TokenInfoRequest): Promise<LoginUserResponse>;
}
