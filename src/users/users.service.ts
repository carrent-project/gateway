import {
  Injectable,
  Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class UsersService {
  constructor(
    @Inject("USERS_SERVICE") private readonly usersClient: ClientProxy,
  ) {}

  async sayHi() {
    return await firstValueFrom(this.usersClient.send("users.list", {}))
  }

  async getUsers() {
    return await firstValueFrom(this.usersClient.send("users.get-users", {}))

  }
}
