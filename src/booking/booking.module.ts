import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "src/auth/auth.module";
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: "BOOKING_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 5004,
        },
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
