import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform payloads into the DTO types
    whitelist: true,  // Strip properties that are not in the DTO class
  }));

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('Document Management and RAG-based Q&A Application')
    .setDescription('Document Management and RAG-based Q&A Application API documentation')
    .setVersion('1.0')
    .addBearerAuth()  // Optional: if your API uses JWT Bearer Authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
