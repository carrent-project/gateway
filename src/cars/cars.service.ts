import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from "rxjs";

@Injectable()
export class CarsService {
    constructor(
        @Inject("CARS_SERVICE") private readonly carsClient: ClientProxy
    ) {}

    async sayHi() {
        return await firstValueFrom(this.carsClient.send('cars.hello', {}))
    }
}