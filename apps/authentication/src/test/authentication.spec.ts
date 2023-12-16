import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationModule } from "../module/authentication.module";
import { CreateUserRequest } from "@app/common/dto";
import {
  CustomException,
  ExceptionType,
} from "@app/common/exception/custom.exception";
import { NodeBcryptService } from "../providers/bcrypt/bcrpy.service";
import { AuthenticationServiceModule } from "../module/authentication.service.module";
import {AuthenticationService} from "../providers/authenticationservice.interface";
import {AUTHENTICATION_SERVICE} from "../authentication.metadata";

describe("AuthenticationController", () => {
  let authenticationDomain: NodeBcryptService;
  let authenticationService: AuthenticationService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthenticationServiceModule.forRoot({
        isDev: true,
        isGlobal : false,
      })],
    }).compile();

    authenticationDomain = app.get<NodeBcryptService>(NodeBcryptService);
    authenticationService = app.get<AuthenticationService>(
      AUTHENTICATION_SERVICE
    );
  });

  it("should be defined", () => {
    expect(authenticationDomain).toBeDefined();
    expect(authenticationService).toBeDefined();
  });

  describe("Authentication Domain Test", () => {
    it("Checking Password Hash", async () => {
      const pw1 = "password";
      const pw2 = "password2";

      const result = await authenticationDomain.hash(pw1);
      console.log(result, pw1);

      expect(await authenticationDomain.compare(result, pw1)).toBe(true);
      expect(await authenticationDomain.compare(result, pw2)).toBe(false);
    });
  });

  describe("Authentication Serivce Test", () => {
    it("Find User", async () => {
      const createUserRequest: CreateUserRequest = {
        user_id: "rhkdguskim",
        password: "1234",
        name: "test",
      };
      try {
        const user = await authenticationService.signIn(createUserRequest);
        
      } catch (e) {
        expect(e).toBeInstanceOf(CustomException);
        expect(e.msg.code).toEqual(ExceptionType.AUTHENTICATION_ERROR);
      }
    });

    it("Find Users", async () => {
      const result = await authenticationService.findOne(30);
      expect(result).toEqual(null);
    });
  });
});
