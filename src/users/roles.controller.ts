import { Controller, Get } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly usersService: UsersService) {}

  @Get("all-roles")
  @ApiOperation({ summary: "Getting all roles" })
  @ApiResponse({
    status: 200,
    description: "All roles recieved successfully",
    // type: [User],
    // example: {
    //   data: [
    //     {
    //       id: "1633487b-8491-4ecf-8603-2aa9c5145377",
    //       email: "testov2@test.ru",
    //       name: "teest",
    //       createdAt: "2026-03-19T18:12:34.112Z",
    //       updatedAt: "2026-03-19T18:12:34.112Z",
    //       roles: [
    //         {
    //           roleName: "user",
    //           roleDescription: "Пользователь",
    //         },
    //       ],
    //     },
    //   ],
    //   total: 107,
    //   page: 12,
    //   limit: 10,
    //   totalPages: 11,
    // },
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async getRoles(
  ): Promise<{id: number, name: string, description: string}> {
    return this.usersService.getRoles();
  }
}
