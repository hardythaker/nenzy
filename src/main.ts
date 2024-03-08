import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Setup global prefix as hostname/api/{routes}
  app.setGlobalPrefix('api');

  //Setup validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  //Setup logger
  app.useLogger(app.get(Logger));

  //Setup exception filter for mongoose errors.
  //This is needed because mongoose errors are not caught by the default exception filter.
  app.useGlobalFilters(new MongooseExceptionFilter());

  //Setup swagger documentation.
  const config = new DocumentBuilder()
    .setTitle('Nenzy API')
    .setDescription('The Nenzy API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  //Start the server
  await app.listen(3000);
}
bootstrap();
