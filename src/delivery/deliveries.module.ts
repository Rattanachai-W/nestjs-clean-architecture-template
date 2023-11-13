import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { TodoController } from './todo/todo.controller';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { PokemonController } from './cache-example/pokemon.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    ExceptionsModule,
    LoggerModule,
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [UserController, TodoController, PokemonController],
})
export class DeliveriesModule {}
