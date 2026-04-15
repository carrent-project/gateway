import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Search,
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
import { CarsService } from "./cars.service";
import { AddCarDto, Car } from "@carrent/shared";
import { AuthGuard } from "src/auth/auth.guard";
import { IRequestWithUser } from "src/common/interfaces";

@ApiTags("Cars")
@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get("cars-list")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Getting all cars from service with filters" })
  @ApiResponse({
    status: 200,
    description: "Requested cars recieved successfully",
    type: [Car],
    example: {
      data: [
        {
          id: "b22ce169-6fc1-43eb-97d6-688419fff84c",
          brand: "Ford",
          model: "Focus",
          year: 2013,
          description: "This is developers car :-)",
          status: "AVAILABLE",
          pricePerDay: "500",
          transmission: "manual",
          ownerId: "0a99e65d-21b8-425a-9e16-361527c36ad4",
          fuelType: "petrol",
          color: "blue",
          location: "Rybinsk",
          createdAt: "2026-04-15 06:17:26.188",
          updatedAt: "2026-04-15 06:17:26.188",
        },
      ],
      total: 107,
      page: 12,
      limit: 10,
      totalPages: 11,
    },
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  @ApiQuery({ name: "search", required: false, type: String, example: "" })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  async getCarsList(
    @Query("search") search: string = "",
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
  ) {
    return this.carsService.getCarsList(search, +page, +limit);
  }

  @Get("car-by-id/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Getting car by id" })
  @ApiResponse({
    status: 200,
    description: "Getting car by id",
    type: Car,
    example: {
      id: "b22ce169-6fc1-43eb-97d6-688419fff84c",
      brand: "Ford",
      model: "Focus",
      year: 2013,
      description: "This is developers car :-)",
      status: "AVAILABLE",
      pricePerDay: 500,
      transmission: "manual",
      ownerId: "0a99e65d-21b8-425a-9e16-361527c36ad4",
      fuelType: "petrol",
      color: "blue",
      location: "Rybinsk",
      createdAt: "2026-04-15T06:17:26.188Z",
      updatedAt: "2026-04-15T06:17:26.188Z",
    },
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async getCarById(@Param("id") id: string) {
    return this.carsService.getCarById(id)
  }

  @Post("add-car")
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
          location: "Moscow",
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
    const ownerId = req.user.userId;
    return this.carsService.addCar(dto, ownerId);
  }

  @Delete("delete-car-by-id/:id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remove car by id" })
  @ApiResponse({
    status: 204,
    description: "Car successfully removed by id",
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async removeCarById(@Param("id") id: string) {
    return this.carsService.removeCarById(id)
  }
}
