import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { DeliveriesModule } from './delivery/deliveries.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { LoggingInterceptor } from './infrastructure/utility/interceptor/logging.interceptor';
import { TimeoutInterceptor } from './infrastructure/utility/interceptor/timeout.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    CacheModule.register({
      store: redisStore,
      // host: '127.0.0.1',
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      isGlobal: true,
    }),
    ExceptionsModule,
    DeliveriesModule,
    EnvironmentConfigModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
