import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { description, name, version } from '../package.json';
import { AppModule } from './app.module';
import { ValidationException } from './libs/exceptions/validation-exception';
import { setupSwagger } from './libs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  app.enableCors();

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        errors.map((e) => {
          throw new ValidationException(e);
        });
      },
    }),
  );

  setupSwagger({ title: name, description, version }, app, '');

  await app.listen(configService.get('http.port') as string);
}
bootstrap();
