import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';

@ApiTags("Booking")
@Controller("booking")
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Get("say-hi")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Handshake between services" })
    @ApiResponse({ status: 200, description: "booking greetings succeeded" })
    @ApiResponse({ status: 503, description: "Server does not works" })
    async sayHi() {
        return this.bookingService.sayHi()
    }

}