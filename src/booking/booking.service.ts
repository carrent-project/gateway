import { CreateBookingDto } from '@carrent/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from "rxjs";

@Injectable()
export class BookingService {
    constructor(
        @Inject("BOOKING_SERVICE") private readonly bookingClient: ClientProxy
    ) {}

    async getBookingList() {
        return await firstValueFrom(this.bookingClient.send("booking.get-booking-list", {}))
    }

    async createBooking(dto: CreateBookingDto, userId: string) {
        return await firstValueFrom(this.bookingClient.send("booking.create-booking", { dto, userId }))
    }
}