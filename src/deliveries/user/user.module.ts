import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { ExceptionsModule } from 'src/infrastructures/exceptions/exceptions.module';
import { UserController } from './user.controller';

@Module({
  imports: [UsecaseProxyModule.register(), ExceptionsModule],
  controllers: [UserController],
})
export class UserModule {}
