/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { TodoCommand } from '../repositories/todo.repository';
import { UseCaseProxy } from './usecase-proxy';
import { addTodoUseCases } from '../../use-case/todo/addTodo.usecases';
import { FindOneTodoUsecase } from '../../use-case/todo/findOneTodo.usecases';
import { FindAllUseCases } from '../../use-case/todo/findAllTodo.usecase';
import { UpdateTodoUseCases } from '../../use-case/todo/updateTodo.usecases';
import { DeleteTodoUseCases } from '../../use-case/todo/deleteTodo.usecases';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
@Module({
  imports: [RepositoriesModule, LoggerModule, EnvironmentConfigModule, ],
})
export class UsecaseProxyModule {

  static TODO_ADD_USE_CASE = 'todoAddUseCase';
  static TODO_FIND_ONE_USE_CASE = 'todoFineOneUseCase';
  static TODO_FIND_ALL_USE_CASE = 'todoFineALLUseCase';
  static TODO_UPDATE_USE_CASE = 'todoUpdateUseCase';
  static TODO_DELETE_USE_CASE = 'todoDeleteUseCase';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [


        {
          inject: [LoggerService, TodoCommand],
          provide: UsecaseProxyModule.TODO_ADD_USE_CASE,
          useFactory: (logger: LoggerService, todoCommand: TodoCommand) =>
            new UseCaseProxy(new addTodoUseCases(logger, todoCommand)),
        },
        {
          inject: [TodoCommand],
          provide: UsecaseProxyModule.TODO_FIND_ONE_USE_CASE,
          useFactory: (todoCommand: TodoCommand) =>
            new UseCaseProxy(new FindOneTodoUsecase(todoCommand)),
        },
        {
          inject: [TodoCommand],
          provide: UsecaseProxyModule.TODO_FIND_ALL_USE_CASE,
          useFactory: (todoCommand: TodoCommand) =>
            new UseCaseProxy(new FindAllUseCases(todoCommand)),
        },
        {
          inject: [LoggerService, TodoCommand],
          provide: UsecaseProxyModule.TODO_UPDATE_USE_CASE,
          useFactory: (logger: LoggerService,todoCommand: TodoCommand) =>
            new UseCaseProxy(new UpdateTodoUseCases(logger, todoCommand)),
        },
        {
          inject: [LoggerService, TodoCommand],
          provide: UsecaseProxyModule.TODO_DELETE_USE_CASE,
          useFactory: (logger: LoggerService, todoCommand: TodoCommand) =>
            new UseCaseProxy(new DeleteTodoUseCases(logger, todoCommand)),
        },
      ],
      exports: [
        UsecaseProxyModule.TODO_ADD_USE_CASE,
        UsecaseProxyModule.TODO_DELETE_USE_CASE,
        UsecaseProxyModule.TODO_FIND_ALL_USE_CASE,
        UsecaseProxyModule.TODO_FIND_ONE_USE_CASE,
        UsecaseProxyModule.TODO_UPDATE_USE_CASE
      ],
    };
  }
}
