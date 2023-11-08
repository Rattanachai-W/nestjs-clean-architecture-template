import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { TodoController } from './todo/todo.controller';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { SuccessResponseModule } from 'src/infrastructure/response/response.module';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    ExceptionsModule,
    SuccessResponseModule,
  ],
  controllers: [UserController, TodoController],
})
export class DeliveriesModule {}
