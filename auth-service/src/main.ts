import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {Transport , MicroserviceOptions} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { 
      host: "localhost",
      port: 5005
    },
  });
  await app.listen(); 
  console.log('Auth microservice is listening on port 5005');
   
}

bootstrap();
