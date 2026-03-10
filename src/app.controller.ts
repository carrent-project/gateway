import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Первая группа запросов')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Описание первого ЭП' })
  @ApiResponse({ status: 200, description: 'Приветственный ответ' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Описание второго ЭП' })
  @ApiResponse({ status: 200, description: 'Супер ответ' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  getHealth(): string {
    return this.appService.getHealth();
  }
}


