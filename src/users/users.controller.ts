import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('hi')
  @ApiOperation({ summary: 'Greeting' })
  @ApiResponse({ 
    status: 200, 
    description: 'Hello friend',
    type: Function
  })
  @ApiResponse({ status: 400, description: 'Some error has occured' })
  @ApiResponse({ status: 503, description: 'Server does not works' })
  async sayHi(): Promise<any> {
    return this.usersService.sayHi();
  }

  @Get('all-users')
  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ 
    status: 200, 
    description: 'All users recieved successfully',
    type: Function
  })
  @ApiResponse({ status: 400, description: 'Some error has occured' })
  @ApiResponse({ status: 503, description: 'Server does not works' })
  async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }
}