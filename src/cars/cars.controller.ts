import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';

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
}