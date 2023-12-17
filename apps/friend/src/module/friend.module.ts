import { Logger, Module } from "@nestjs/common";
import { FriendMicroserviceController } from "../controller/friend.microservice.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@app/common/module";
import { FriendServiceModule } from "./friend.service.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), FriendServiceModule.forRoot({isDev : false, isGlobal : false})],
  controllers: [FriendMicroserviceController],
  providers: [Logger],
})
export class FriendModule {}
