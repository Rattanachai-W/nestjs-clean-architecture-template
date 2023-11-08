import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './infrastructure/util/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log('Environment : ', process.env.NODE_ENV);
  app.setGlobalPrefix('api');
  // app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
