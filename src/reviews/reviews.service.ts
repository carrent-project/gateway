import { CreateBookingDto, EBookingStatus } from '@carrent/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from "rxjs";

@Injectable()
export class ReviewsService {
    constructor(
        @Inject("REVIEWS_SERVICE") private readonly reviewsClient: ClientProxy
    ) {}

    async sayHi() {
        return await firstValueFrom(this.reviewsClient.send("reviews.say-hi", {}))
    }
}