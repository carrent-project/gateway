import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
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
import { BookingService } from "./booking.service";
import { CreateBookingDto, PaginatedBookingResponse } from "@carrent/shared";
import { IRequestWithUser } from "src/common/interfaces";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("Booking")
@Controller("booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get("get-booking-list")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Getting booking list" })
  @ApiResponse({
    status: 200,
    description: "Request for getting booking list",
    type: PaginatedBookingResponse,
    example: {
      data: [
        {
          id: "dc72c3d1-ceda-42d5-89e2-9bd33af74fb4",
          carId: "b22ce169-6fc1-43eb-97d6-688419fff84c",
          userId: "0a99e65d-21b8-425a-9e16-361527c36ad4",
          totalPrice: 350000,
          status: "PENDING",
          startDate: "2026-04-24T10:00:00.000Z",
          endDate: "2026-05-01T10:00:00.000Z",
          createdAt: "2026-04-22T18:25:39.148Z",
          updatedAt: "2026-04-22T18:25:39.148Z",
        },
        {
          id: "837712c0-2b5e-47f7-8ca0-b31b5b01ccb6",
          carId: "797a9782-95dd-42b7-8038-a4003b826c8c",
          userId: "0a99e65d-21b8-425a-9e16-361527c36ad4",
          totalPrice: 900000,
          status: "PENDING",
          startDate: "2026-06-01T10:00:00.000Z",
          endDate: "2026-06-10T10:00:00.000Z",
          createdAt: "2026-04-23T06:06:38.723Z",
          updatedAt: "2026-04-23T06:06:38.723Z",
        },
      ],
      total: 777,
      page: 777,
      limit: 777,
      totalPages: 777,
    },
  })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  async getBookingList(
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
    @Req() req: IRequestWithUser
  ) {
    const roles = req.user.roles.map((role) => role.roleName);
    if (!roles.includes("admin")) {
      throw new ForbiddenException("You showd be admin");
    }
    return this.bookingService.getBookingList(+page, +limit);
  }

  @Post("create-booking")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Creating booking for users car rent" })
  @ApiBody({
    type: CreateBookingDto,
    examples: {
      data: {
        value: {
          carId: "b22ce169-6fc1-43eb-97d6-688419fff84c",
          startDate: "2025-05-01T10:00:00Z",
          endDate: "2025-05-01T10:00:00Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Request for creating booking for users car rent",
  })
  @ApiResponse({ status: 400, description: "One of fields is not valid" })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async createBooking(
    @Body() dto: CreateBookingDto,
    @Req() req: IRequestWithUser,
  ) {
    const userId = req.user.userId;
    return this.bookingService.createBooking(dto, userId);
  }
}
