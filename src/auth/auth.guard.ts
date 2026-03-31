import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    console.log('🔐 AuthGuard | token:', token);
    console.log('🔐 AuthGuard | JWT_SECRET from env:', process.env.JWT_SECRET);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || "secret",
      });
      console.log('✅ AuthGuard | payload:', payload);
      request.user = payload;
      return true;
    } catch (error) {
      console.log("❌ AuthGuard | verify error:", error.message);
      throw new UnauthorizedException("Invalid token");
    }
  }
}
