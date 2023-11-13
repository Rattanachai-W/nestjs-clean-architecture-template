import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { CacheController } from './cache-example/cache.controller';
import { HttpModule } from '@nestjs/axios';
import { HealthModule } from './helth-check/helth-check.module';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    ExceptionsModule,
    LoggerModule,
    HttpModule.register({
      timeout: 5000,
    }),
    HealthModule,
  ],
  controllers: [TodoController, CacheController],
})
export class DeliveriesModule {}
