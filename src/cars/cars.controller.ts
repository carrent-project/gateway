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
  Put,
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
import {
  AddCarDto,
  Car,
  PaginatedCarsResponse,
  UpdateCarDto,
  UpdateCarFuelTypeDto,
  UpdateCarStatusDto,
  UpdateCarTransmissionDto,
} from "@carrent/shared";
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
    type: PaginatedCarsResponse,
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
    return this.carsService.getCarById(id);
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

  @Put("update-car-common-fields")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Updare cars common fields" })
  @ApiBody({
    type: UpdateCarDto,
    examples: {
      default: {
        value: {
          id: "f9e89372-c994-4655-9adb-e002c81b1c8b",
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
    status: 200,
    description: "Car has been updated successfully",
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async updateCar(@Body() dto: UpdateCarDto, @Req() req: IRequestWithUser) {
    const userId = req.user.userId;
    const userRoles = req.user.roles;
    return this.carsService.updateCar(dto);
  }

  @Delete("delete-car-by-id/:id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remove car by id" })
  @ApiResponse({ status: 204, description: "Car successfully removed by id" })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 404, description: "Car not found" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async removeCarById(@Param("id") id: string) {
    return this.carsService.removeCarById(id);
  }

  @Patch("update-car-status/:id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update car status" })
  @ApiBody({
    type: UpdateCarStatusDto,
    examples: {
      default: {
        value: {
          status: "AVAILABLE",
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: "Status updated" })
  @ApiResponse({ status: 400, description: "One of fields is not valid" })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async updateCarStatus(
    @Param("id") id: string,
    @Body() dto: UpdateCarStatusDto,
    @Req() req: IRequestWithUser,
  ) {
    const userId = req.user.userId;
    const car = await this.carsService.getCarById(id);
    if (
      car.ownerId !== userId &&
      !req.user.roles.includes("admin") &&
      !req.user.roles.includes("manager")
    ) {
      throw new ForbiddenException("You are not the owner");
    }
    return this.carsService.updateCarStatus(id, dto.status);
  }

  @Patch("update-car-transmission/:id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update car transmission" })
  @ApiBody({
    type: UpdateCarTransmissionDto,
    examples: {
      default: {
        value: {
          transmission: "manual",
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: "Transmission updated" })
  @ApiResponse({ status: 400, description: "One of fields is not valid" })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async updateCarTransmission(
    @Param("id") id: string,
    @Body() dto: UpdateCarTransmissionDto,
    @Req() req: IRequestWithUser,
  ) {
    const userId = req.user.userId;
    const car = await this.carsService.getCarById(id);
    if (
      car.ownerId !== userId &&
      !req.user.roles.includes("admin") &&
      !req.user.roles.includes("manager")
    ) {
      throw new ForbiddenException("You are not the owner");
    }
    return this.carsService.updateCarTransmission(id, dto.transmission);
  }

  @Patch("update-car-fuelType/:id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update car fuelType" })
  @ApiBody({
    type: UpdateCarFuelTypeDto,
    examples: {
      default: {
        value: {
          fuelType: "petrol",
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: "FuelType updated" })
  @ApiResponse({ status: 400, description: "One of fields is not valid" })
  @ApiResponse({ status: 401, description: "User is not authorized" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async updateCarFuelType(
    @Param("id") id: string,
    @Body() dto: UpdateCarFuelTypeDto,
    @Req() req: IRequestWithUser,
  ) {
    const userId = req.user.userId;
    const car = await this.carsService.getCarById(id);
    if (
      car.ownerId !== userId &&
      !req.user.roles.includes("admin") &&
      !req.user.roles.includes("manager")
    ) {
      throw new ForbiddenException("You are not the owner");
    }
    return this.carsService.updateCarFuelType(id, dto.fuelType);
  }
}
