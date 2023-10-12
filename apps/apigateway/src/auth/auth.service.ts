import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
  Logger,
  Inject,
} from "@nestjs/common";
import {OAuthRequest, NewTokenRequest, LoginUserResponse, CreateUserRequest, LoginUserRequest} from "@app/common/dto";
import {
  AUTHORIZATION_SERVICE,
  JWT_SIGN,
} from "@app/common/message/authorization";
import {
  AUTHENTICATION_SERVICE,
  OAUTH_SIGN_IN,
  SIGN_UP,
  SIGN_IN,
  GET_NEW_TOKEN,
} from "@app/common/message/authentication";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {User} from "@app/common/entity";

@Injectable()
export class AuthService {
  constructor(
    @Inject(Logger) private logger: Logger,
    @Inject(AUTHENTICATION_SERVICE) private authenticationClient: ClientProxy,
    @Inject(AUTHORIZATION_SERVICE) private authorizationClient: ClientProxy
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse> {
    try {
      // 1. 유저 아이디와 패스워드로 인증을 요청한다.
      const user: User = await lastValueFrom(
        this.authenticationClient.send<User>({ cmd: SIGN_IN }, loginUser)
      );
      // 2. JWT Payload의 범위를 지정한다.
      const { id, user_id } = user;

      // 3. 인가 서버를 통해 JWT 토큰을 발급한다.
      return await lastValueFrom(
        this.authorizationClient.send<LoginUserResponse>(
          { cmd: JWT_SIGN },
          { id, user_id }
        )
      );
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException(e.message);
    }
  }

  async create(createUserDto: CreateUserRequest): Promise<User> {
    try {
      // 1. 인증 서버에 회원가입을 요청한다.
      return await lastValueFrom(
        this.authenticationClient.send<User>({ cmd: SIGN_UP }, createUserDto)
      );
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
      return await lastValueFrom(
        this.authorizationClient.send<LoginUserResponse>(
          { cmd: GET_NEW_TOKEN },
          newtokenRequest
        )
      );
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException(e.message);
    }
  }

  async OAuthLogin(OAuthData: OAuthRequest): Promise<any> {
    const pattern = { cmd: OAUTH_SIGN_IN };
    try {
      // 1. 인증서버에게 OAuth 데이터를 통해 회원가입이 되어있지 않다면 회원가입을 요청한다.
      return await lastValueFrom(
        this.authenticationClient.send<LoginUserResponse>(pattern, OAuthData)
      );
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException(e.message);
    }
  }
}
