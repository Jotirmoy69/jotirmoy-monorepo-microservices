import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 5005
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5006',
          package: 'inventory',
          protoPath: join(__dirname, '..', '..', 'libs', 'proto', 'inventory.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController], 
})
export class AppModule {}
