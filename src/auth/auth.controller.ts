import { Controller, Post, Body, HttpCode, HttpStatus, Put, UseGuards, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto, TokenResponseDto, UpdateUserPasswordDto, UpdateUserRolesDto } from "@carrent/shared";
import { AuthGuard } from './auth.guard';

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Регистрация нового пользователя" })
  @ApiBody({
    type: RegisterDto,
    examples: {
      default: {
        value: {
          email: "insert@email.ru",
          password: "654321",
          name: "user name",
          phone: "79999999999"
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Пользователь успешно зарегистрирован",
    type: TokenResponseDto,
  })
  @ApiResponse({ status: 409, description: "Пользователь уже существует" })
  @ApiResponse({ status: 400, description: "Неверные данные" })
  @ApiResponse({ status: 503, description: "Сервис авторизации недоступен" })
  async register(@Body() dto: RegisterDto): Promise<TokenResponseDto> {
    return this.authService.register(dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Вход в систему" })
  @ApiBody({
    type: LoginDto,
    examples: {
      default: {
        value: {
          email: "kaban@dimas.ru",
          password: "654321",
          phone: "79995477830"
        },
      },
    }
  })
  @ApiResponse({
    status: 200,
    description: "Успешный вход",
    type: TokenResponseDto,
  })
  @ApiResponse({ status: 401, description: "Неверные email или пароль" })
  @ApiResponse({ status: 503, description: "Сервис авторизации недоступен" })
  async login(@Body() dto: LoginDto): Promise<TokenResponseDto> {
    return this.authService.login(dto);
  }

  @Put("change-password")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "changing password" })
  @ApiBody({
    type: UpdateUserPasswordDto,
    examples: {
      default: {
        value: {
          email: "kaban@dimas.ru",
          oldPassword: "111111",
          newPassword: "222222",
          phone: "79000000000"
        },
      },
    }
  })
  @ApiResponse({
    status: 201,
    description: "Password has changed",
  })
  @ApiResponse({ status: 401, description: "Invalid password or email" })
  @ApiResponse({ status: 503, description: "Service currently is not available" })
  async updateUserPassword(@Body() dto: UpdateUserPasswordDto): Promise<string> {
    return this.authService.updateUserPassword(dto);
  }

  @Post("update-users-role/:userId")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "changing users roles" })
  @ApiBody({
    type: UpdateUserRolesDto,
    examples: {
      default: {
        value: {
          roles: ["user", "admin", "manager"]
        },
      },
    }
  })
  @ApiResponse({
    status: 201,
    description: "Password has changed",
  })
  @ApiResponse({ status: 401, description: "Invalid password or email" })
  @ApiResponse({ status: 401, description: "Bad request" })
  @ApiResponse({ status: 503, description: "Service currently is not available" })
  async updateUserRoles(@Body() dto: UpdateUserRolesDto, @Param("userId") userId: string): Promise<{ message: string }> {
    return this.authService.updateUserRoles(dto, userId);
  }
}
