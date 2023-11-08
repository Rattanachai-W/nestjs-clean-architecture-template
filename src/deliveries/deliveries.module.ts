import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { TodoController } from './todo/todo.controller';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { ExceptionsModule } from 'src/infrastructures/exceptions/exceptions.module';
@Module({
  imports: [UsecaseProxyModule.register(), ExceptionsModule],
  controllers: [UserController, TodoController],
})
export class DeliveriesModule {}
