import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { PaginatedUsersResponse, User } from "@carrent/shared";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("hi")
  @ApiOperation({ summary: "Greeting" })
  @ApiResponse({
    status: 200,
    description: "Hello friend",
    content: {
      "text/plain": {
        example: "This is just greetng to make sure gatway is works",
      },
    },
  })
  @ApiResponse({ status: 400, description: "Some error has occured" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async sayHi(): Promise<any> {
    return this.usersService.sayHi();
  }

  @Get("all-users")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Getting all users with pagination and filters" })
  @ApiResponse({
    status: 200,
    description: "All users recieved successfully",
    type: [User],
    example: {
      data: [
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
  async getUsers(
    @Query("search") search: string = "",
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
  ): Promise<PaginatedUsersResponse> {
    return this.usersService.getUsers(search, +page, +limit);
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
