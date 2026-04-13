import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CARS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 5003,
        },
      },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}