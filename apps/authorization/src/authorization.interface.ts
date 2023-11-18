import { JWTRequest, JWTResponse, LoginUserResponse } from "@app/common/dto";

export const AUTHORIZATION_SERVICE = "AUTHORIZATION_SERVICE";
export const OAUTH_FACTORY_SERVICE = "OAUTH_FACTORY_SERVICE";
export const KAKAO_OAUTH = "KAKAO_OAUTH";
export const NAVER_OAUTH = "NAVER_OAUTH";
export const JWT_SERVICE = "JWT_SERVICE";
export const HTTP_SERVICE = "HTTP_SERVICE";

export interface AuthorizationService {
  verify(payload: string): Promise<JWTResponse>;
  sign(payload: JWTRequest): Promise<LoginUserResponse>;
}

export interface AuthorizationController {
  verify(payload: string): Promise<JWTResponse>;
  sign(payload: JWTRequest): Promise<LoginUserResponse>;
}
