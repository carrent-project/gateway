import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ReviewsService } from "./reviews.service";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly bookingService: ReviewsService) {}

  @Get("reviews-say-hi")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Getting booking list" })
  @ApiResponse({
    status: 200,
    description: "Request for test reviews",
  })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async sayHi() {
    return this.bookingService.sayHi();
  }
}
