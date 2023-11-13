import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      isGlobal: true,
    }),
    HttpModule.register({
      timeout: 5000,
    }),
    LoggerModule,
  ],
  controllers: [CacheController],
})
export class CacheExampleModule {}
