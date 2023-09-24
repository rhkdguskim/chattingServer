import { NestFactory } from '@nestjs/core';
import { AuthenticationServiceModule } from './authentication-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_PROTO_PATH } from '@app/common';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions> (
    AuthenticationServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url:"localhost:5000",
        package: 'authentication',
        protoPath: AUTHENTICATION_PROTO_PATH,
      },
    }
  );
  
  await app.listen();
}
bootstrap();
