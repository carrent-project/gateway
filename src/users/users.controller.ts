import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { User } from "@carrent/shared";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("hi")
  @ApiOperation({ summary: "Greeting" })
  @ApiResponse({
    status: 200,
    description: "Hello friend",
    type: Function,
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async sayHi(): Promise<any> {
    return this.usersService.sayHi();
  }

  @Get("all-users")
  @ApiOperation({ summary: "Getting all users" })
  @ApiResponse({
    status: 200,
    description: "All users recieved successfully",
    type: [User],
    example: [
      {
        id: "1633487b-8491-4ecf-8603-2aa9c5145377",
        email: "testov2@test.ru",
        name: "teest",
        createdAt: "2026-03-19T18:12:34.112Z",
        updatedAt: "2026-03-19T18:12:34.112Z",
      },
      {
        id: "2ddac8d3-341a-425c-9165-f42034786ac5",
        email: "dimas@kaban.ru",
        name: "Kaban D.A.",
        createdAt: "2026-03-11T18:24:54.589Z",
        updatedAt: "2026-03-11T18:24:54.589Z",
      },
    ],
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get("user-by-id/:id")
  @ApiOperation({ summary: "Getting user by id" })
  @ApiResponse({
    status: 200,
    description: "User successfully found by id",
    type: User,
    example: {
      id: "1633487b-8491-4ecf-8603-2aa9c5145377",
      email: "testov2@test.ru",
      name: "teest",
      createdAt: "2026-03-19T18:12:34.112Z",
      updatedAt: "2026-03-19T18:12:34.112Z",
    },
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async getUserById(@Param("id") id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }
}
