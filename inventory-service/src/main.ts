/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {  
      url: 'localhost:5006',
      package: 'inventory',
      protoPath: join(__dirname, '..', '..', 'libs', 'proto', 'inventory.proto'),
    },
  });
  await app.listen();
  Logger.log('Inventory service is running');
}

bootstrap();
