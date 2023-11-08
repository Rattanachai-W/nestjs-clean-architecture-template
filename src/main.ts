import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log('Environment : ', process.env.NODE_ENV);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
