import { NestFactory } from "@nestjs/core";
import { FileModuleService } from "./module/file.module";
import { SERVER_INFO_CONFIG } from "@config/config.interface";

async function bootstrap() {
  const app = await NestFactory.create(FileModuleService);
  await app.listen(SERVER_INFO_CONFIG.file.port);
}
bootstrap();
