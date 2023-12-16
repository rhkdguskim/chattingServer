import {JWTRequest, JWTResponse, TokenResponse} from "../dto/authorization.dto";

export interface AuthorizationController {
    verify(payload: string): Promise<JWTResponse>;
    sign(payload: JWTRequest): Promise<TokenResponse>;
}