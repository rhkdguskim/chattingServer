import { NestFactory } from "@nestjs/core";
import { FileModuleService } from "./file.module";
import { FILE_PORT } from "@app/common/config";

async function bootstrap() {
  const app = await NestFactory.create(FileModuleService);
  await app.listen(FILE_PORT);
}
bootstrap();
