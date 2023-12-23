import { Test, TestingModule } from "@nestjs/testing";
import {
  ServerException,
  ServerExceptionCode,
} from "@app/common/exception/server.exception";
import { AuthenticationService } from "@app/authentication/providers/authentication.service.interface";
import {
  AUTHENTICATION_SERVICE,
  BCRYPT_SERVICE,
} from "@app/authentication/authentication.metadata";
import {
  LoginUserRequest,
  LoginUserResponse,
} from "@app/authentication/dto/authenticaion.dto";
import { BcryptService } from "@app/common/auth/bcrypt/bcrpy.interface";
import { AuthenticationTestModule } from "@app/authentication/module/authentication.test.module";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/user/dto/user.dto";

describe("Authentication Service Test", () => {
  let authenticationHashService: BcryptService;
  let authenticationService: AuthenticationService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthenticationTestModule],
    }).compile();

    authenticationHashService = app.get<BcryptService>(BCRYPT_SERVICE);
    authenticationService = app.get<AuthenticationService>(
      AUTHENTICATION_SERVICE
    );
  });

  describe("Authentication Hash Service Test", () => {
    it("Password Hash", async () => {
      const pw1 = "password";
      const hashedPw = authenticationHashService.hash(pw1);
      expect(authenticationHashService.compare(pw1, hashedPw)).toBe(true);
    });
  });

  describe("Authentication Local Service Test", () => {
    it("SignUp User", async () => {
      const createUserRequest: CreateUserRequest = {
        status_msg: "안녕하세요",
        user_id: "test",
        password: "1234",
        name: "test",
      };
      try {
        const user = await authenticationService.register(createUserRequest);
        expect(user).toBeInstanceOf(UserInfoResponse);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
        expect(e.msg.code).toEqual(ServerExceptionCode.Already_Exist);
      }
    });

    it("SignIn User RightWay", async () => {
      const createUserRequest: LoginUserRequest = {
        user_id: "test",
        password: "1234",
      };
      try {
        const loginUserResponse = await authenticationService.signIn(
          createUserRequest
        );
        expect(loginUserResponse).toBeInstanceOf(LoginUserResponse);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
        expect(e.msg.code).toEqual(ServerExceptionCode.Authorization);
      }
    });

    it("SignIn User Wrong Way", async () => {
      const createUserRequest: LoginUserRequest = {
        user_id: "test",
        password: "12345",
      };
      try {
        const loginUserResponse = await authenticationService.signIn(
          createUserRequest
        );
        expect(loginUserResponse).toBeInstanceOf(LoginUserResponse);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
        expect(e.msg.code).toEqual(ServerExceptionCode.Authentication);
      }
    });

    it("Find User", async () => {
      try {
        const result = await authenticationService.findUserByID("test");
        expect(result).toBeInstanceOf(UserInfoResponse);
      } catch (e) {
        expect(e.msg.code).toEqual(ServerExceptionCode.NotFound);
      }
    });

    it("Update User", async () => {
      const user = await authenticationService.findUserByID("test");

      const newUser = new UpdateUserRequest({
        ...user,
        user_id: "test2",
        name: "test2",
      });
      try {
        const ret = await authenticationService.updateUser(user.id, newUser);

        expect(ret).toEqual(true);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
        expect(e.msg.code).toEqual(ServerExceptionCode.Already_Exist);
      }
    });

    it("Find UpdatedUser", async () => {
      try {
        const result = await authenticationService.findUserByID("test2");
        expect(result).toBeInstanceOf(UserInfoResponse);
      } catch (e) {
        expect(e.msg.code).toEqual(ServerExceptionCode.NotFound);
      }
    });

    it("Delete User", async () => {
      try {
        const user = await authenticationService.findUserByID("test");
        const result = await authenticationService.deleteUser(user.id);
        expect(result).toEqual(true);
      } catch (e) {
        expect(e.msg.code).toEqual(ServerExceptionCode.NotFound);
      }
    });

    it("find All Users", async () => {
      for (let i = 1; i <= 30; i++) {
        const createUserRequest: CreateUserRequest = {
          status_msg: `안녕하세요${i}`,
          user_id: `test${i}`,
          password: "1234",
          name: `test${i}`,
        };
        try {
          const user = await authenticationService.register(createUserRequest);
          expect(user).toBeInstanceOf(UserInfoResponse);
        } catch (e) {
          expect(e).toBeInstanceOf(ServerException);
          expect(e.msg.code).toEqual(ServerExceptionCode.Already_Exist);
        }
      }

      const users = await authenticationService.findAllUsers();
      expect(users).toBeInstanceOf(Array<UserInfoResponse>);
    });

    it("delete all Users", async () => {
      const users = await authenticationService.findAllUsers();
      users.map(async (user) => {
        const result = await authenticationService.deleteUser(user.id);
        expect(result).toEqual(true);
      });
    });
  });

  it("ADD test User", async () => {
    for (let i = 0; i < 10; i++) {
      const createUserRequest: CreateUserRequest = {
        name: `테스트유저${i}`,
        status_msg: `안녕하세요 테스트유저${i} 입니다1`,
        user_id: `test${i}`,
        password: "12345",
      };

      try {
        const user = await authenticationService.register(createUserRequest);
        expect(user).toBeInstanceOf(UserInfoResponse);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
        expect(e.msg.code).toEqual(ServerExceptionCode.Already_Exist);
      }
    }
  });
});
