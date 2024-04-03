import { Logger } from 'nestjs-pino';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import {
  MongooseExceptionFilter,
} from './common/filters/mongoose-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Setup CORS Config
  app.enableCors({
    origin: ['http://localhost:3000'],
  });

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
    // .addServer('https://nenzy.onrender.com/', 'Devlopment environment')
    // .addServer('/', 'Local environment')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
    customSiteTitle: 'Nenzy API Documentation',
  });

  //Start the server
  await app.listen(3000);
}
bootstrap();
