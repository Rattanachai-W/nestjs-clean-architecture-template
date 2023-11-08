import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UseCaseProxy } from '../../infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from '../../infrastructures/usecase-proxy/usecase-proxy.module';
import { AddTodoDto } from './todo.dto';
import { addTodoUseCases } from '../../use-cases/todo/addTodo.usecases';
import { TodoPresenter } from './todo.presenter';

@Controller('todo')
export class TodoController {
  constructor(
    @Inject(UsecaseProxyModule.TODO_ADD_USE_CASE)
    private readonly addTodoUsecaseProxy: UseCaseProxy<addTodoUseCases>,
  ) {}

  @Post('add')
  async addTodo(@Body() addTodoDto: AddTodoDto) {
    const { content } = addTodoDto;
    const todoCreated = await this.addTodoUsecaseProxy
      .getInstance()
      .execute(content);
    return new TodoPresenter(todoCreated);
  }
}
