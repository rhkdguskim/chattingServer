import {
  TokenInfoRequest,
  TokenInfoResponse,
} from "@app/auth/dto/authorization.dto";

export interface AuthorizationController {
  verify(payload: TokenInfoRequest): Promise<TokenInfoResponse>;
}
