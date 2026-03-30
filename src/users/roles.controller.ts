import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { ICreateRoleDto, ICreateRoleResponse } from '@carrent/shared';

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
  async getRoles(): Promise<{ id: number; name: string; description: string }> {
    return this.usersService.getRoles();
  }

  @Post("add-role")
  @ApiOperation({ summary: "Creating new role" })
  @ApiBody({
    type: ICreateRoleDto,
    examples: {
      default: {
        value: {
          name: "example_role",
          description: "This is just an example role"
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Role is successfully created",
    type: ICreateRoleResponse,
  })
  @ApiResponse({ status: 409, description: "Роль уже существует" })
  @ApiResponse({ status: 400, description: "Неверные данные" })
  @ApiResponse({ status: 503, description: "Сервис обработки пользователей недоступен" })
  async addRole(@Body() dto: ICreateRoleDto): Promise<ICreateRoleResponse> {
    return this.usersService.addRole(dto);
  }

  @Delete("remove-role/:roleName")
  @ApiOperation({ summary: "Removing role by name" })
  @ApiResponse({
    status: 200,
    description: "Role successfully removed by name"
  })
  @ApiResponse({ status: 404, description: "Role has not found" })
  @ApiResponse({ status: 503, description: "Server does not works" })
  async removeRoleByName(@Param("roleName") roleName: string) {
        console.log("==> roleName 777 : ", roleName);
    return this.usersService.removeRoleByName(roleName)
  }
}
