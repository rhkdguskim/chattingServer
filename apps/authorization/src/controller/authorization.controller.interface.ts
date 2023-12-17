import {JWTRequest, JWTResponse, TokenResponse} from "../dto/authorization.dto";
import {OAuthData} from "@app/common/dto/oauth.dto";

export interface AuthorizationController {
    verify(payload: string): Promise<JWTResponse>;
    sign(payload: JWTRequest): Promise<TokenResponse>;
    refreshToken(token:string) : Promise<TokenResponse>;
    oAuthKakao(data : OAuthData) : Promise<TokenResponse>;
    oAuthNaver(data : OAuthData) : Promise<TokenResponse>;
    oAuthGoogle(data : OAuthData) : Promise<TokenResponse>;
}