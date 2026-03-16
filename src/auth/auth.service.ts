import {
  Injectable,
  Inject,
  UnauthorizedException,
  ConflictException,
  ServiceUnavailableException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { LoginDto, RegisterDto, TokenResponseDto } from '@carrent/shared';

@Injectable()
export class AuthService {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy,
  ) {}

  async login(dto: LoginDto): Promise<TokenResponseDto> {
    try {
      return await firstValueFrom(this.authClient.send("auth.login", dto));
    } catch (error) {
      console.log("Error from microservice:", JSON.stringify(error, null, 2));

      if (error.code === "ECONNREFUSED") {
        throw new ServiceUnavailableException(
          "Сервис авторизации временно недоступен",
        );
      }

      // Ошибка от микросервиса может быть в error.response или самом error
      const responseError = error.response || error;

      if (responseError?.statusCode === 401) {
        throw new UnauthorizedException("Неверный email или пароль");
      }

      if (responseError?.statusCode === 409) {
        throw new ConflictException(
          "Пользователь с таким email уже существует",
        );
      }

      if (responseError?.message?.includes("Invalid credentials")) {
        throw new UnauthorizedException("Неверный email или пароль");
      }

      console.error("Login error:", error);
      throw new InternalServerErrorException("Произошла ошибка при входе");
    }
  }

  async register(dto: RegisterDto): Promise<TokenResponseDto> {
    try {
      return await firstValueFrom(this.authClient.send("auth.register", dto));
    } catch (error) {
      console.log("Error from microservice:", JSON.stringify(error, null, 2));

      if (error.code === "ECONNREFUSED") {
        throw new ServiceUnavailableException(
          "Сервис авторизации временно недоступен",
        );
      }

      const responseError = error.response;

      if (responseError?.statusCode === 409) {
        throw new ConflictException(
          "Пользователь с таким email уже существует",
        );
      }

      if (responseError?.statusCode === 401) {
        throw new UnauthorizedException("Неверный email или пароль");
      }

      if (error.message?.includes("already exists")) {
        throw new ConflictException(
          "Пользователь с таким email уже существует",
        );
      }

      console.error("Register error:", error);
      throw new InternalServerErrorException("Ошибка при регистрации");
    }
  }
}
