import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ReviewsService } from "./reviews.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateNewReviewDto, Review } from "@carrent/shared";
import { IRequestWithUser, TRoleName } from "src/common/interfaces";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get("get-review-by-id/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Getting review by id" })
  @ApiResponse({
    status: 200,
    description: "Request for getting review by id",
    type: Review,
    example: {
      id: "string",
      bookingId: "2addf832-f31d-4e24-bd4b-5d819f4b9cf8",
      carId: "16d4d610-d1e5-4892-a9d9-22c8281edbcc",
      userId: "afc1df82-994d-42f2-8c3e-779468618ee4",
      rating: 5,
      comment: "Nullable fiend",
      isApproved: false,
      createdAt: "2026-05-19T18:00:11.924Z",
      updatedAt: "2026-05-19T18:00:11.924Z",
    },
  })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 404, description: "Review is not found" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async getReviewById(@Param("id") id: string) {
    return this.reviewsService.getReviewById(id);
  }

  @Get("get-car-reviews-by-car-id/:carId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Getting reviews by carId" })
  @ApiResponse({
    status: 200,
    description: "Request for getting review by id",
    type: [Review],
    example: [
      {
        id: "string",
        bookingId: "2addf832-f31d-4e24-bd4b-5d819f4b9cf8",
        carId: "16d4d610-d1e5-4892-a9d9-22c8281edbcc",
        userId: "afc1df82-994d-42f2-8c3e-779468618ee4",
        rating: 5,
        comment: "Nullable fiend",
        isApproved: false,
        createdAt: "2026-05-19T18:00:11.924Z",
        updatedAt: "2026-05-19T18:00:11.924Z",
      },
    ],
  })
  @ApiResponse({ status: 404, description: "Car is not found" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async getCarReviewsByCarId(@Param("carId") carId: string) {
    return this.reviewsService.getCarReviewsByCarId(carId);
  }

  @Get("get-car-average-rating/:carId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Getting cars average rating" })
  @ApiResponse({
    status: 200,
    description: "Request for getting review by id",
    example: { average: 4, totalReviews: 100 },
  })
  @ApiResponse({ status: 404, description: "Car is not found" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async getCarAverageRating(@Param("carId") carId: string) {
    return this.reviewsService.getCarAverageRating(carId);
  }

  @Post("create-review")
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create new review" })
  @ApiBody({
    type: CreateNewReviewDto,
    examples: {
      default: {
        value: {
          bookingId: "2addf832-f31d-4e24-bd4b-5d819f4b9cf8",
          carId: "16d4d610-d1e5-4892-a9d9-22c8281edbcc",
          rating: 5,
          comment: null,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Review has been created successfully",
    type: Review,
    example: {
      id: "string",
      bookingId: "2addf832-f31d-4e24-bd4b-5d819f4b9cf8",
      carId: "16d4d610-d1e5-4892-a9d9-22c8281edbcc",
      userId: "afc1df82-994d-42f2-8c3e-779468618ee4",
      rating: 5,
      comment: "Nullable fiend",
      isApproved: false,
      createdAt: "2026-05-19T18:00:11.924Z",
      updatedAt: "2026-05-19T18:00:11.924Z",
    },
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async createNewReview(
    @Body() dto: CreateNewReviewDto,
    @Req() req: IRequestWithUser,
  ) {
    const userId = req.user.userId;
    return await this.reviewsService.createNewReview(dto, userId);
  }

  @Delete("remove-review-by-id/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Remove review by id" })
  @ApiResponse({
    status: 204,
    description: "Review has been removed successfully",
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async removeReviewById(
    @Param("id") id: string,
    @Req() req: IRequestWithUser,
  ) {
    const roles = req.user.roles.map((role) => role.roleName);
    const allowedRoles = ["admin", "manager"];
    if (!allowedRoles.some((role) => roles.includes(role as TRoleName))) {
      throw new ForbiddenException("User showd be admin or manager");
    }
    return await this.reviewsService.removeReviewById(id);
  }

  @Patch("approve-review/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update review isApproved flag" })
  @ApiResponse({
    status: 200,
    description: "Review isApproved flag has been updated successfully",
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 403, description: "User role is forbidden, only admin or manager are allowed" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  @ApiQuery({
    name: "isApproved",
    required: true,
    type: String,
    example: "true",
  })
  async approveReview(
    @Param("id") id: string,
    @Query("isApproved") isApproved: string = "true",
    @Req() req: IRequestWithUser,
  ) {
    const roles = req.user.roles.map((role) => role.roleName);
    const allowedRoles = ["admin", "manager"];
    if (!allowedRoles.some((role) => roles.includes(role as TRoleName))) {
      throw new ForbiddenException("User showd be admin or manager");
    }
    const isApprovedBoolean = isApproved === 'true'
    return await this.reviewsService.approveReview(id, isApprovedBoolean)
  }
}
