import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { AddCarDto } from '@carrent/shared';
import { AuthGuard } from 'src/auth/auth.guard';
import { IRequestWithUser } from 'src/common/interfaces';

@ApiTags("Cars")
@Controller("cars")
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

  @Get("say-hi")
  @ApiOperation({ summary: "Cars ms says hi" })
  @ApiResponse({
    status: 200,
    description: "Some Greetings"
  })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async sayHi() {
    return this.carsService.sayHi()
  }

  @Post('add-car')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Add new car" })
  @ApiBody({
    type: AddCarDto,
    examples: {
      default: {
        value: {
          brand: "Toyota",
          model: "corolla",
          year: 2025,
          pricePerDay: 100,
          description: "Some description",
          transmission: "auto",
          fuelType: "petrol",
          color: "red",
          location: "Moscow"
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "New car has been created",
  })
  @ApiResponse({ status: 400, description: "One of fields is not valid" })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async addCar(@Body() dto: AddCarDto, @Req() req: IRequestWithUser) {
    const ownerId = req.user.userId
    return this.carsService.addCar(dto, ownerId);
  }
}