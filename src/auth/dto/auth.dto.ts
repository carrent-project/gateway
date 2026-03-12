import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль (мин. 6 символов)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Иван Петров', description: 'Имя пользователя' })
  @IsString()
  name: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль' })
  @IsString()
  password: string;
}

export class UserResponseDto {
  @ApiProperty({ example: 'cmmmdch8d00008fbmir3h623' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'Иван Петров' })
  name: string;
}

export class TokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIs...' })
  access_token: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}