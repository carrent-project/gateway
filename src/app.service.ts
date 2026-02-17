import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Шлюз крутится, работает, слушает!';
  }

  getHealth(): string {
    return 'Роутинг тоже прикрепил пока что';
  }
}
