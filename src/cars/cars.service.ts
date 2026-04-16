import { AddCarDto, CarStatus, UpdateCarDto } from '@carrent/shared';
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class CarsService {
  constructor(
    @Inject("CARS_SERVICE") private readonly carsClient: ClientProxy,
  ) {}

  async getCarsList(search: string, page: number, limit: number) {
    return await firstValueFrom(this.carsClient.send("cars.get-cars-lest", { search, page, limit }))
  }

  async getCarById(id: string) {
    return await firstValueFrom(this.carsClient.send("cars.get-car-by-id", { id }))
  }

  async addCar(dto: AddCarDto, ownerId: string) {
    return await firstValueFrom(this.carsClient.send("cars.add-car", { dto,  ownerId }))
  }

  async updateCar(dto: UpdateCarDto) {
    return await firstValueFrom(this.carsClient.send("car.update-car", { dto }))
  }

  async removeCarById(id: string) {
    return await firstValueFrom(this.carsClient.send("cars.remove-car-by-id", { id }))
  }

  async updateCarStatus(id: string, status: CarStatus) {
    return await firstValueFrom(this.carsClient.send("cars.update-car-status", { id, status }))
  }
}
