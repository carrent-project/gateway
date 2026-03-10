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
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      docExpansion: 'none', // 'none' | 'list' | 'full'
    }
  });

  app.enableCors(); // Включение CORS

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);

  console.log(`Gateway running on: http://localhost:${PORT}`);
}
gateaway();
