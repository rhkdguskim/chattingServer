import {JWTRequest, JWTResponse, TokenRequest} from "../dto/authorization.dto";

export interface AuthorizationController {
    verify(payload: JWTRequest): Promise<JWTResponse>;
}