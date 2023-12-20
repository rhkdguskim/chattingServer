import { Test, TestingModule } from "@nestjs/testing";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";
import { AuthenticationService } from "@app/authentication/providers/authentication.service.interface";
import {
  AUTHENTICATION_BCRYPT,
  AUTHENTICATION_SERVICE,
} from "@app/authentication/authentication.metadata";
import {
  CreateUserRequest,
  LoginUserRequest,
  LoginUserResponse,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/authentication/dto/authenticaion.dto";
import { BcryptService } from "@app/authentication/providers/bcrypt/bcrpy.interface";
import { AuthenticationTestModule } from "@app/authentication/module/authentication.test.module";
import { AuthenticationController } from "@app/authentication/controller/authentication.controller.interface";
import { AuthenticationControllerImpl } from "@app/authentication/controller/authentication.controller";

describe("Authentication Service Test", () => {
  let authenticationHashService: BcryptService;
  let authenticationService: AuthenticationService;
  let authenticationController: AuthenticationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthenticationTestModule],
    }).compile();

    authenticationController = app.get<AuthenticationController>(
      AuthenticationControllerImpl
    );
    authenticationHashService = app.get<BcryptService>(AUTHENTICATION_BCRYPT);
    authenticationService = app.get<AuthenticationService>(
      AUTHENTICATION_SERVICE
    );
  });

  describe("authenticationController Test", () => {
    it("SignIn", async () => {
      const loginUserRequest: LoginUserRequest = {
        password: "test",
        user_id: "1234",
      };
      try {
        const result = await authenticationController.signIn(loginUserRequest);
        expect(result).toBeInstanceOf(LoginUserResponse);
      } catch (e) {
        expect(e).toBeInstanceOf(ChatServerException);
      }
    });
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
        expect(e).toBeInstanceOf(ChatServerException);
        expect(e.msg.code).toEqual(ChatServerExceptionCode.Already_Exist);
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
        expect(e).toBeInstanceOf(ChatServerException);
        expect(e.msg.code).toEqual(ChatServerExceptionCode.Authorization);
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
        expect(e).toBeInstanceOf(ChatServerException);
        expect(e.msg.code).toEqual(ChatServerExceptionCode.Authentication);
      }
    });

    it("Find User", async () => {
      try {
        const result = await authenticationService.findUserByID("test");
        expect(result).toBeInstanceOf(UserInfoResponse);
      } catch (e) {
        expect(e.msg.code).toEqual(ChatServerExceptionCode.NotFound);
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
        expect(e).toBeInstanceOf(ChatServerException);
        expect(e.msg.code).toEqual(ChatServerExceptionCode.Already_Exist);
      }
    });

    it("Find UpdatedUser", async () => {
      try {
        const result = await authenticationService.findUserByID("test2");
        expect(result).toBeInstanceOf(UserInfoResponse);
      } catch (e) {
        expect(e.msg.code).toEqual(ChatServerExceptionCode.NotFound);
      }
    });

    it("Delete User", async () => {
      try {
        const user = await authenticationService.findUserByID("test");
        const result = await authenticationService.deleteUser(user.id);
        expect(result).toEqual(true);
      } catch (e) {
        expect(e.msg.code).toEqual(ChatServerExceptionCode.NotFound);
      }
    });

    it("find All Users", async () => {
      const cnt = 50;
      for (let i = 1; i <= cnt; i++) {
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
          expect(e).toBeInstanceOf(ChatServerException);
          expect(e.msg.code).toEqual(ChatServerExceptionCode.Already_Exist);
        }
      }

      const users = await authenticationService.findAllUsers();
      expect(users.length).toEqual(cnt);
    });

    it("delete all Users", async () => {
      const users = await authenticationService.findAllUsers();
      users.map(async (user) => {
        const result = await authenticationService.deleteUser(user.id);
        expect(result).toEqual(true);
      });
    });
  });
});
