import { CreateBookingDto, EBookingStatus } from '@carrent/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from "rxjs";

@Injectable()
export class BookingService {
    constructor(
        @Inject("BOOKING_SERVICE") private readonly bookingClient: ClientProxy
    ) {}

    async getBookingList(page: number, limit: number, status?: EBookingStatus) {
        return await firstValueFrom(this.bookingClient.send("booking.get-booking-list", { page, limit, status }))
    }

    async createBooking(dto: CreateBookingDto, userId: string) {
        return await firstValueFrom(this.bookingClient.send("booking.create-booking", { dto, userId }))
    }

    async removeBooking(id: string) {
        return await firstValueFrom(this.bookingClient.send("booking.remove-booking-by-id", { id }))
    }

    async changeBookingStatus(id: string, newStatus: EBookingStatus, userId: string, isAdmin: boolean) {
        return await firstValueFrom(this.bookingClient.send("booking.change-booking-status", { id, newStatus, userId, isAdmin }))
    }
}