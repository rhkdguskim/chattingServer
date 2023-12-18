import {JWTRequest, JWTResponse} from "../dto/authorization.dto";
import {LoginUserResponse} from "@app/authentication/dto/authenticaion.dto";

export interface AuthorizationService {
    verify(payload: string): Promise<JWTResponse>;
    sign(payload: JWTRequest): Promise<LoginUserResponse>;
}