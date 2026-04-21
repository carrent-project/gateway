import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from "rxjs";

@Injectable()
export class BookingService {
    constructor(
        @Inject("BOOKING_SERVICE") private readonly bookingClient: ClientProxy
    ) {}

    async sayHi() {
        return await firstValueFrom(this.bookingClient.send("booking.say-hi", {}))
    }
}