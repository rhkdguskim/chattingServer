import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationModule } from "./authentication.module";
import { UserTypeORM } from "@app/common/entity/typeorm";
import { CreateUserRequest } from "@app/common/dto";
import { CustomRpcExceptionException, RpcExceptionType } from "@app/common/exception/customrpcexception.exception";

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

      describe("CreateUser", () => {
        it('Should be User', async () => {
          const createUserRequest : CreateUserRequest = {
            user_id : "rhkdguskim",
            password : "1234",
            name : "test",
          }
          try {
            const user = await authenticationService.create(createUserRequest)
            expect(user).toBeInstanceOf(UserTypeORM)
          } catch (e) {
            expect(e).toBeInstanceOf(CustomRpcExceptionException)
            expect(e.msg.code).toEqual(RpcExceptionType.AUTHENTICATION_ERROR)
          }
        })  
      })

      describe('some test case', () => {
        it('should do something', async () => {
            expect(await authenticationService.findOne(30)).toEqual(null);
        });
      });
  });
