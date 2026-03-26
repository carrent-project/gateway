import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function gateaway() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  // Валидация
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Car Rent API Gateway')
    .setDescription('Документация для API Gateway проекта car-rent')
    .setVersion('1.0')
    .addTag('Authentication')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  app.enableCors();

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);

  console.log(`Gateway running on: http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api`);
}
gateaway();