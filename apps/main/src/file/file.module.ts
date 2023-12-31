import { Module } from "@nestjs/common";
import { FileModuleService } from "@app/file/module/file.module";

@Module({
  imports: [FileModuleService],
})
export class FileModule {}
