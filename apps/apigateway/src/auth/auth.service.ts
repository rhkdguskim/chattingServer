import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
  Logger,
  Inject,
} from "@nestjs/common";
import {
  OAuthRequest,
  NewTokenRequest,
  LoginUserResponse,
  CreateUserRequest,
  LoginUserRequest,
} from "@app/common/dto";
import {
  AUTHORIZATION_SERVICE,
  JWT_SIGN,
} from "@app/common/message/authorization";
import {
  AUTHENTICATION_SERVICE,
  SIGN_UP,
  SIGN_IN,
  GET_NEW_TOKEN,
} from "@app/common/message/authentication";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { UserTypeORM } from "@app/common/entity/typeorm";
import { IAuthenticationClient } from "@app/common/clients/authenication.interface.client";
import { IAuthorizaionClient } from "@app/common/clients/authorization.interface.client";

@Injectable()
export class AuthService {
  constructor(
    @Inject(Logger) private logger: Logger,
    @Inject(AUTHENTICATION_SERVICE)
    private authenticationClient: IAuthenticationClient,
    @Inject(AUTHORIZATION_SERVICE)
    private authorizationClient: IAuthorizaionClient
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse> {
    try {
      // 1. 유저 아이디와 패스워드로 인증을 요청한다.
      const user: UserTypeORM = await this.authenticationClient.SignIn(loginUser);
      // 2. JWT Payload의 범위를 지정한다.
      const { id, user_id } = user;

      // 3. 인가 서버를 통해 JWT 토큰을 발급한다.
      return await this.authorizationClient.Sign({ id, user_id });
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException(e.message);
    }
  }

  async create(createUserDto: CreateUserRequest): Promise<UserTypeORM> {
    try {
      // 1. 인증 서버에 회원가입을 요청한다.
      return await this.authenticationClient.SignUp(createUserDto);
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException(e.message);
    }
  }
  async getNewAccessToken(
    newtokenRequest: NewTokenRequest
  ): Promise<LoginUserResponse> {
    try {
      // 1. 인가서버에 JWT 토큰 재발급을 요청한다.
      return;
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException(e.message);
    }
  }
}
