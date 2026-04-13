import {
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  ServiceUnavailableException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleGatewayError = (error: any): never => {
  if (error.code === 'ECONNREFUSED') {
    throw new ServiceUnavailableException('Сервис временно недоступен');
  }

  const responseError = error.response || error;
  const statusCode = responseError?.statusCode;
  const message = responseError?.message;

  switch (statusCode) {
    case 401:
      throw new UnauthorizedException(message || 'Неверные учетные данные');
    case 404:
      throw new NotFoundException(message || 'Не найдено');
    case 409:
      throw new ConflictException(message || 'Конфликт');
    default:
      throw new InternalServerErrorException(message || 'Внутренняя ошибка сервера');
  }
};