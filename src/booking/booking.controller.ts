import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "@carrent/shared";
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
  })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async getBookingList(@Req() req: IRequestWithUser) {
    const roles = req.user.roles.map((role) => role.roleName);
    if (!roles.includes("admin")) {
      throw new ForbiddenException("You showd be admin");
    }
    return this.bookingService.getBookingList();
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
