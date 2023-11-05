import { Test, TestingModule } from "@nestjs/testing";
import { arrayBuffer } from "stream/consumers";
import { AuthorizationService } from "./authorization.service";
import { AuthorizationModule } from "./authorization.module";
import { AuthorizationController } from "./authorization.controller";

describe("AuthorizaionTest", () => {
    let Controller: AuthorizationController;
    let Service: AuthorizationService;


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
          imports: [AuthorizationModule],
        }).compile();
    
        Controller = app.get<AuthorizationController>(AuthorizationController);
        Service = app.get<AuthorizationService>(AuthorizationService);
      });

      describe('JWT Vertify', () => {
        it('should do something', async () => {
            const token = await Service.sign({
                user_id : "TestID",
                id : 1
            })
            console.log(token)
            expect(Service.verify(token.access_token)).resolves
        });
      });
  });
