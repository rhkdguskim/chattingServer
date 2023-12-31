import { UserService } from "@app/user/providers/user.service.interface";
import { Inject } from "@nestjs/common";
import { BCRYPT_SERVICE } from "@app/auth/authentication.metadata";
import { BcryptService } from "@app/auth/providers/bcrypt/bcrpy.interface";
import { UserRepository } from "@app/user/repository/users.interface.repository";
import {
  ServerException,
  ServerExceptionCode,
} from "@app/common/exception/server.exception";
import { UserEntity } from "@app/user/entity/users.entity";
import { USER_REPOSITORY } from "@app/user/user.metadata";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/user/dto/user.dto";

export class UserServiceImpl implements UserService {
  constructor(
    @Inject(BCRYPT_SERVICE)
    private bcryptService: BcryptService,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository
  ) {}

  async register(createUserDto: CreateUserRequest): Promise<UserInfoResponse> {
    const user = await this.userRepository.findOneByUserID(
      createUserDto.user_id
    );

    if (user) {
      throw new ServerException({
        message: "Already Exist",
        code: ServerExceptionCode.Already_Exist,
      });
    }

    createUserDto.password = this.bcryptService.hash(createUserDto.password);
    return new UserInfoResponse(
      await this.userRepository.create(createUserDto)
    );
  }

  async findUserByID(id: number): Promise<UserInfoResponse> {
    let user: UserEntity;
    if (typeof id === "number") {
      user = await this.userRepository.findOne(id);
    } else {
      user = await this.userRepository.findOneByUserID(id);
    }

    if (!user) {
      throw new ServerException({
        message: "Can't Find User Information",
        code: ServerExceptionCode.NotFound,
      });
    }
    return new UserInfoResponse(user);
  }

  async updateUser(id: number, payload: UpdateUserRequest): Promise<boolean> {
    try {
      return await this.userRepository.update(id, payload);
    } catch (e) {
      throw new ServerException({
        message: e,
        code: ServerExceptionCode.Authentication,
      });
    }
  }

  async deleteUser(payload: number): Promise<boolean> {
    const result = await this.userRepository.delete(payload);
    if (!result) {
      throw new ServerException({
        message: "Can't not found User",
        code: ServerExceptionCode.NotFound,
      });
    }
    return result;
  }

  async findAllUsers(): Promise<UserInfoResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => {
      return new UserInfoResponse(user);
    });
  }
}
