import { Inject, Injectable } from "@nestjs/common";
import {
  ServerException,
  ServerExceptionCode,
} from "@app/common/exception/server.exception";
import { AuthenticationService } from "./authentication.service.interface";
import { BCRYPT_SERVICE } from "../authentication.metadata";
import { UserRepository } from "@app/user/repository/users.interface.repository";
import {
  LoginUserRequest,
  LoginUserResponse,
} from "@app/auth/dto/authenticaion.dto";
import { BcryptService } from "@app/auth/providers/bcrypt/bcrpy.interface";
import { JWT_SERVICE } from "@app/auth/authorization.metadata";
import { JwtServiceImpl } from "@app/auth/providers/jwt/jwtServiceImpl";
import { TokenInfoRequest } from "@app/auth/dto/authorization.dto";
import { USER_REPOSITORY } from "@app/user/user.metadata";

@Injectable()
export class AuthenticationServiceImpl implements AuthenticationService {
  constructor(
    @Inject(JWT_SERVICE)
    private readonly jwtService: JwtServiceImpl,
    @Inject(BCRYPT_SERVICE)
    private bcryptService: BcryptService,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.userRepository.findOneByUserID(loginUser.user_id);
    if (!user) {
      throw new ServerException({
        message: "There is no User",
        code: ServerExceptionCode.Authentication,
      });
    }

    if (!this.bcryptService.compare(loginUser.password, user.password)) {
      throw new ServerException({
        message: "Invalid Password",
        code: ServerExceptionCode.Authentication,
      });
    }

    return await this.jwtService.sign(new TokenInfoRequest(user));
  }
}
