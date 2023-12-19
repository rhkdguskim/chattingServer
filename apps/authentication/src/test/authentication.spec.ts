import { Test, TestingModule } from "@nestjs/testing";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";
import { NodeBcryptService } from "../providers/bcrypt/bcrpy.service";
import {AuthenticationService} from "../providers/authentication.service.interface";
import {AUTHENTICATION_BCRYPT, AUTHENTICATION_SERVICE} from "../authentication.metadata";
import {CreateUserRequest} from "@app/authentication/dto/authenticaion.dto";
import {AuthenticationModule} from "@app/authentication/module/authentication.module";
import {BcryptService} from "@app/authentication/providers/bcrypt/bcrpy.interface";

describe("Authentication Module", () => {
  let authenticationHashService: BcryptService;
  let authenticationService: AuthenticationService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthenticationModule.forRoot({
        isDev : true,
        isMicroService : false
      })],
    }).compile();

    authenticationHashService = app.get<BcryptService>(AUTHENTICATION_BCRYPT);
    authenticationService = app.get<AuthenticationService>(
      AUTHENTICATION_SERVICE
    );
  });

  it("should be defined", () => {
    expect(authenticationHashService).toBeDefined();
    expect(authenticationService).toBeDefined();
  });

  describe("Authentication Hash Service Test", () => {
    it("Password Hash", async () => {
      const pw1 = "password";
      const hashedPw = authenticationHashService.hash(pw1);
      expect(authenticationHashService.compare(pw1, hashedPw)).toBe(true);
    });
  });

  describe("Authentication Service Test", () => {
    it("Find User", async () => {
      const createUserRequest: CreateUserRequest = {
        user_id: "rhkdguskim",
        password: "1234",
        name: "test",
      };
      try {
        const user = await authenticationService.signIn(createUserRequest);
      } catch (e) {
        expect(e).toBeInstanceOf(ChatServerException);
        expect(e.msg.code).toEqual(ChatServerExceptionCode.AUTHENTICATION);
      }
    });

    it("Find Users", async () => {
      try {
        const result = await authenticationService.findOne(30);
        expect(result).toEqual(null);
      } catch (e) {
      }
    });
  });
});
