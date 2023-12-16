import {
  Injectable,
  UnauthorizedException,
  Logger,
  Inject,
} from "@nestjs/common";
import {
  NewTokenRequest,
  LoginUserResponse,
  CreateUserRequest,
  LoginUserRequest,
} from "@app/common/dto";
import {
  AUTHORIZATION_SERVICE,
} from "@app/common/message/authorization";

import { User } from "../../../authentication/src/entity/users.entity";
import { AuthorizationService } from "apps/authorization/src/authorization.interface";
import {AuthenticationService} from "../../../authentication/src/providers/authenticationservice.interface";
import {AUTHENTICATION_SERVICE} from "../../../authentication/src/authentication.metadata";

@Injectable()
export class AuthService {
  constructor(
    @Inject(Logger) private logger: Logger,
    @Inject(AUTHENTICATION_SERVICE)
    private authenticationService: AuthenticationService,
    @Inject(AUTHORIZATION_SERVICE)
    private authorizationService: AuthorizationService
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse> {
    try {
      // 1. 유저 아이디와 패스워드로 인증을 요청한다.
      const user: User = await this.authenticationService.signIn(
        loginUser
      );
      // 2. JWT Payload의 범위를 지정한다.
      const { id, user_id } = user;

      // 3. 인가 서버를 통해 JWT 토큰을 발급한다.
      return await this.authorizationService.sign({ id, user_id });
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException(e.message);
    }
  }

  async create(createUserDto: CreateUserRequest): Promise<User> {
    try {
      // 1. 인증 서버에 회원가입을 요청한다.
      return await this.authenticationService.signUp(createUserDto);
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
