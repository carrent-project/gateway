import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import {
  LoginDto,
  RegisterDto,
  TokenResponseDto,
  UpdateUserPasswordDto,
} from "@carrent/shared";
import { handleGatewayError } from "src/utils";

@Injectable()
export class AuthService {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy,
  ) {}

  async login(dto: LoginDto): Promise<TokenResponseDto> {
    try {
      return await firstValueFrom(this.authClient.send("auth.login", dto));
    } catch (error) {
      console.log("[GW] Error from microservice:", JSON.stringify(error, null, 2));
      throw handleGatewayError(error);
    }
  }

  async register(dto: RegisterDto): Promise<TokenResponseDto> {
    try {
      return await firstValueFrom(this.authClient.send("auth.register", dto));
    } catch (error) {
      console.log("[GW] Error from microservice:", JSON.stringify(error, null, 2));
      throw handleGatewayError(error);
    }
  }

  async updateUserPassword(dto: UpdateUserPasswordDto): Promise<string> {
    try {
      return await firstValueFrom(
        this.authClient.send("auth.change-password", dto),
      );
    } catch (error) {
      console.log("[GW] Error from microservice:", JSON.stringify(error, null, 2));
      throw handleGatewayError(error);
    }
  }
}
