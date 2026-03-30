import { ICreateRoleDto, ICreateRoleResponse } from '@carrent/shared';
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

  async getUsers(search: string, page: number, limit: number) {
    return await firstValueFrom(this.usersClient.send("users.get-users", { search, page, limit }))
  }

  async getUserById(id: string) {
    return await firstValueFrom(this.usersClient.send("users.user-by-id", { id }))
  }

  async removeUserById(id: string) {
    return await firstValueFrom(this.usersClient.send("users.remove-user", { id }))
  }

  async getRoles() {
    return await firstValueFrom(this.usersClient.send("roles.list", {}))
  }

  async addRole(data: ICreateRoleDto): Promise<ICreateRoleResponse> {
    return await firstValueFrom(this.usersClient.send('roles.add', data))
  }

  async removeRoleByName(roleName: string) {
    return await firstValueFrom(this.usersClient.send("roles.remove", { roleName }))
  }
}
