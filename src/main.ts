// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors();

  // Validación de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('IDRD Materials API')
    .setDescription('API para gestión de materiales y proyectos del IDRD')
    .setVersion('1.0')
    .addTag('materials')
    .addTag('projects')
    .addTag('departments')
    .addTag('cities')
    .addTag('units')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
