import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('hi')
  @ApiOperation({ summary: 'Приветствие' })
  @ApiResponse({ 
    status: 200, 
    description: 'Пользователи успешно получены',
    type: Function
  })
  @ApiResponse({ status: 400, description: 'Some error has occured' })
  @ApiResponse({ status: 503, description: 'Server does not works' })
  async register(): Promise<any> {
    return this.usersService.sayHi();
  }
}