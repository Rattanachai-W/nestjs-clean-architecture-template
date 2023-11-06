import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from './infrastructures/usecase-proxy/usecase-proxy.module';
import { ExceptionsModule } from './infrastructures/exceptions/exceptions.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    ExceptionsModule,
    DeliveriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/environment/.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [],
})
export class AppModule {}
