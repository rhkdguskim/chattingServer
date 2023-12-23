import { Test, TestingModule } from "@nestjs/testing";
import { ServerException } from "@app/common/exception/server.exception";
import { LoginUserResponse } from "@app/authentication/dto/authenticaion.dto";
import { AuthorizationServiceModule } from "@app/authorization/module/authorization.service.module";
import { AuthorizationService } from "@app/authorization/providers/authorization.service.interface";
import { AUTHORIZATION_SERVICE } from "@app/authorization/authorization.metadata";
import { Role } from "@app/user/entity/users.entity";
import { TokenInfoResponse } from "@app/authorization/dto/authorization.dto";

describe("Authorization Service Test", () => {
  let authenticationService: AuthorizationService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthorizationServiceModule],
    }).compile();

    authenticationService = app.get<AuthorizationService>(
      AUTHORIZATION_SERVICE
    );
  });

  describe("authorizationService Test", () => {
    const payload = {
      id: 1,
      role: Role.USER,
      user_id: "test",
    };
    let response: LoginUserResponse;
    it("sign", async () => {
      try {
        response = await authenticationService.sign(payload);
        expect(response).toBeInstanceOf(LoginUserResponse);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
      }
    });

    it("verify", async () => {
      try {
        const response1 = await authenticationService.verify(
          response.access_token
        );
        const response2 = await authenticationService.verify(
          response.refresh_token
        );
        expect(response1).toBeInstanceOf(TokenInfoResponse);
        expect(response2).toBeInstanceOf(TokenInfoResponse);
      } catch (e) {
        expect(e).toBeInstanceOf(ServerException);
      }

      // try {
      //   const response3 = await authenticationService.verify("testst$$%%^");
      //   expect(response3).toBeInstanceOf(JwtResponse);
      // } catch (e) {
      //   console.log(e);
      //   expect(e).toBeInstanceOf(ChatServerException);
      // }
    });
  });
});
