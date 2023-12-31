import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationService } from "@app/auth/providers/authentication.service.interface";
import {
  AUTHENTICATION_SERVICE,
  BCRYPT_SERVICE,
} from "@app/auth/authentication.metadata";
import { BcryptService } from "@app/auth/providers/bcrypt/bcrpy.interface";
import { AuthenticationTestModule } from "@app/auth/module/authentication.test.module";

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
});
