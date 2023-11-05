import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationModule } from "./authentication.module";
import { arrayBuffer } from "stream/consumers";

describe("AuthenticationController", () => {
    let authenticationController: AuthenticationController;
    let authenticationService: AuthenticationService;


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
          imports: [AuthenticationModule],
        }).compile();
    
        authenticationController = app.get<AuthenticationController>(AuthenticationController);
        authenticationService = app.get<AuthenticationService>(AuthenticationService);
      });

      describe('some test case', () => {
        it('should do something', async () => {
            expect(await authenticationService.findOne(0)).toEqual(arrayBuffer);
        });
      });
  });
