import {JWTRequest, JWTResponse, TokenResponse} from "../dto/authorization.dto";

export interface AuthorizationService {
    verify(payload: string): Promise<JWTResponse>;
    sign(payload: JWTRequest): Promise<TokenResponse>;
}