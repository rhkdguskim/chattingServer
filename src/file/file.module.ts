import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { multerOptionsFactory } from "src/util/multer.options.factory";
import { FileController } from "./file.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
