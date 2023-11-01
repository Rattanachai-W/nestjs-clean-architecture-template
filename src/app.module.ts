import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module';
import { UsecaseProxyModule } from './infrastructures/usecase-proxy/usecase-proxy.module';
import { UserController } from './deliveries/user/user.controller';
import { ExceptionsModule } from './infrastructures/exceptions/exceptions.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
@Module({
  imports: [
    UsecaseProxyModule.register(),
    ExceptionsModule,
    EnvironmentConfigModule,
    DeliveriesModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
