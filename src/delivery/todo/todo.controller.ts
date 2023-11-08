import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { UseCaseProxy } from '../../infrastructure/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from '../../infrastructure/usecase-proxy/usecase-proxy.module';
import { AddTodoDto } from './todo.dto';
import { addTodoUseCases } from '../../use-case/todo/addTodo.usecases';
import { FindAllUseCases } from '../../use-case/todo/findAllTodo.usecase';
import { FindOneTodoUsecase } from '../../use-case/todo/findOneTodo.usecases';
// import { UpdateTodoUseCases } from '../../use-cases/todo/updateTodo.usecases';
import { TodoPresenter } from './todo.presenter';

@Controller('todo')
export class TodoController {
  constructor(
    @Inject(UsecaseProxyModule.TODO_ADD_USE_CASE)
    private readonly addTodoUsecaseProxy: UseCaseProxy<addTodoUseCases>,
    @Inject(UsecaseProxyModule.TODO_FIND_ALL_USE_CASE)
    private readonly findAllUsecaseProxy: UseCaseProxy<FindAllUseCases>,
    @Inject(UsecaseProxyModule.TODO_FIND_ONE_USE_CASE)
    private readonly findByIdUsecaseProxy: UseCaseProxy<FindOneTodoUsecase>,
  ) {}

  @Post('add')
  async addTodo(@Body() addTodoDto: AddTodoDto) {
    const { content } = addTodoDto;
    const todoCreated = await this.addTodoUsecaseProxy
      .getInstance()
      .execute(content);
    return new TodoPresenter(todoCreated);
  }

  @Get('find')
  async getTodo(@Query('id', ParseIntPipe) id: number) {
    const todo = await this.findByIdUsecaseProxy.getInstance().execute(id);
    return new TodoPresenter(todo);
  }

  @Get('find/all')
  async getTodos() {
    const todos = await this.findAllUsecaseProxy.getInstance().execute();
    return todos.map((todo) => new TodoPresenter(todo));
  }
}
