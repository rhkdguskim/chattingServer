import { NestFactory } from "@nestjs/core";
import { FileModule } from "./file.module";
import { FILE_PORT } from "@app/common/config";

async function bootstrap() {
  const app = await NestFactory.create(FileModule);
  await app.listen(FILE_PORT);
}
bootstrap();
