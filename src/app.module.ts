import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module';
import { UserModule } from './deliveries/user/user.module';
import { UsecaseProxyModule } from './infrastructures/usecase-proxy/usecase-proxy.module';
import { UserController } from './deliveries/user/user.controller';
import { ExceptionsModule } from './infrastructures/exceptions/exceptions.module';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    UserModule,
    ExceptionsModule,
    EnvironmentConfigModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
