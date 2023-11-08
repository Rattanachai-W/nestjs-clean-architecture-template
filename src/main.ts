import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './infrastructure/utility/interceptor/logging.interceptor';
// import { HttpExceptionFilter } from './infrastructure/utility/http-exception.filter';
import { TimeoutInterceptor } from './infrastructure/utility/interceptor/timeout.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
