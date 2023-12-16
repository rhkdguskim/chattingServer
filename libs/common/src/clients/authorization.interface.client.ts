import {LoginUserResponse} from "@app/authentication/dto/authenticaion.dto";
import {JWTRequest, JWTResponse} from "../../../../apps/authorization/src/dto/authorization.dto";


export interface IAuthorizaionClient {
  Verify(payload: string): Promise<JWTResponse>;
  Sign(payload: JWTRequest): Promise<LoginUserResponse>;
}
