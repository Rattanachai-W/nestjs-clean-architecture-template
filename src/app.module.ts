import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { DeliveriesModule } from './delivery/deliveries.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { SuccessResponseModule } from './infrastructure/response/response.module';
import { LoggingInterceptor } from './infrastructure/util/logging.interceptor';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    ExceptionsModule,
    DeliveriesModule,
    EnvironmentConfigModule,
    LoggerModule,
    SuccessResponseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
