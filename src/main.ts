import { NestFactory, Reflector } from '@nestjs/core';
import * as morgan from 'morgan';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  //use morgan
  app.use(morgan('dev'));

  // Validation pipe for all requests
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /* The `Reflector` class is used
  to retrieve metadata associated with classes, methods, and properties in a NestJS application. */
  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // Get config service
  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors(CORS);

  // Set prefix
  app.setGlobalPrefix('api/v1');

  await app.listen(configService.get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
