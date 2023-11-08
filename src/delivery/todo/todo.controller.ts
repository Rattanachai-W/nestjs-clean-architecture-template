import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  Get,
  ParseIntPipe,
  Put,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UseCaseProxy } from '../../infrastructure/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from '../../infrastructure/usecase-proxy/usecase-proxy.module';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { addTodoUseCases } from '../../use-case/todo/addTodo.usecases';
import { FindAllUseCases } from '../../use-case/todo/findAllTodo.usecase';
import { FindOneTodoUsecase } from '../../use-case/todo/findOneTodo.usecases';
import { UpdateTodoUseCases } from '../../use-case/todo/updateTodo.usecases';
import { DeleteTodoUseCases } from '../../use-case/todo/deleteTodo.usecases';
import { TodoPresenter } from './todo.presenter';
import { Response } from 'express';
import { SuccessResponse } from 'src/infrastructure/response/success/success-response.service';

@Controller('todo')
export class TodoController {
  constructor(
    @Inject(UsecaseProxyModule.TODO_ADD_USE_CASE)
    private readonly addTodoUsecaseProxy: UseCaseProxy<addTodoUseCases>,
    @Inject(UsecaseProxyModule.TODO_FIND_ALL_USE_CASE)
    private readonly findAllUsecaseProxy: UseCaseProxy<FindAllUseCases>,
    @Inject(UsecaseProxyModule.TODO_FIND_ONE_USE_CASE)
    private readonly findByIdUsecaseProxy: UseCaseProxy<FindOneTodoUsecase>,
    @Inject(UsecaseProxyModule.TODO_UPDATE_USE_CASE)
    private readonly updateUsacaseProxy: UseCaseProxy<UpdateTodoUseCases>,
    @Inject(UsecaseProxyModule.TODO_DELETE_USE_CASE)
    private readonly deleteUsecaseProxy: UseCaseProxy<DeleteTodoUseCases>,

    private successResponse: SuccessResponse,
  ) {}

  @Post('add')
  async addTodo(@Body() addTodoDto: AddTodoDto, @Res() res: Response) {
    const { content } = addTodoDto;
    const todoCreated = await this.addTodoUsecaseProxy
      .getInstance()
      .execute(content);
    return res
      .status(HttpStatus.OK)
      .send(new TodoPresenter(new TodoPresenter(todoCreated)));
  }

  @Get('find')
  async getTodo(@Query('id', ParseIntPipe) id: number, @Res() res: Response) {
    const todo = await this.findByIdUsecaseProxy.getInstance().execute(id);
    return res.status(HttpStatus.OK).send(new TodoPresenter(todo));
  }

  @Get('find/all')
  async getTodos(@Res() res: Response) {
    const todos = await this.findAllUsecaseProxy.getInstance().execute();
    return res.status(HttpStatus.OK).send({
      statusCode: 1000,
      messsageTh: 'สำเร็จ',
      messsageEng: 'success',
      data: todos.map((todo) => new TodoPresenter(todo)),
    });
  }

  @Put('find/update-status')
  async updateStatusByIdTodo(
    @Body() updateStatusDto: UpdateStatusDto,
    @Res() res: Response,
  ) {
    await this.updateUsacaseProxy
      .getInstance()
      .execute(updateStatusDto.id, updateStatusDto.isDone);

    return res.status(HttpStatus.OK).send('success');
  }

  @Delete('delete')
  async deleteByIdTodo(
    @Query('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    await this.deleteUsecaseProxy.getInstance().execute(id);

    return res.status(HttpStatus.OK).send('success');
  }
}
