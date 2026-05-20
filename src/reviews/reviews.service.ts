import {
  CreateBookingDto,
  CreateNewReviewDto,
  EBookingStatus,
} from "@carrent/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ReviewsService {
  constructor(
    @Inject("REVIEWS_SERVICE") private readonly reviewsClient: ClientProxy,
  ) {}

  async sayHi() {
    return await firstValueFrom(this.reviewsClient.send("reviews.say-hi", {}));
  }

  async createNewReview(dto: CreateNewReviewDto, userId: string) {
    return await firstValueFrom(
      this.reviewsClient.send("reviews.create-review", { dto, userId }),
    );
  }

  async removeReviewById(id: string) {
    return await firstValueFrom(
        this.reviewsClient.send("reviews.remove-review-by-id", { id })
    )
  }
}
