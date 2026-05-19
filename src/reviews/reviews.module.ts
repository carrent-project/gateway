import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "src/auth/auth.module";
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: "REVIEWS_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 5005,
        },
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
