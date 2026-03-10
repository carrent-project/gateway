import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function gateaway() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Шлюз проекта car-rent")
    .setDescription("Полное описание всех ЭП")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Включаем CORS
  app.enableCors();

  const port = process.env.PORT || 5000;
  await app.listen(port);

  console.log(`Gateway running on: http://localhost:${port}`);
}
gateaway();
