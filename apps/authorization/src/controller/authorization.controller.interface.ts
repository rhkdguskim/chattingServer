import { TokenInfoRequest, TokenInfoResponse } from "../dto/authorization.dto";

export interface AuthorizationController {
  verify(payload: TokenInfoRequest): Promise<TokenInfoResponse>;
}
