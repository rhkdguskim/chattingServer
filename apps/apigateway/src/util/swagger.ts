import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle("Kwangs Chatting API Docs")
    .setDescription("Kwangs Chatting API description")
    .setVersion("1.0.0")
    .addApiKey(
      { type: "apiKey", name: "authentication", in: "header" },
      "authentication"
    )
    .addOAuth2()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
}
