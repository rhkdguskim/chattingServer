import { Module } from "@nestjs/common";
import { FileModuleService } from "@app/file/file.module";

@Module({
  imports: [FileModuleService],
})
export class FileModule {}
