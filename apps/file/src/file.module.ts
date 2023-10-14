import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { multerOptionsFactory } from "@src/util/multer.options.factory";
import { FileController } from "./file.controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), "uploads"),
    }),
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
