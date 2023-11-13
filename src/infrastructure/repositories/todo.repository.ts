import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoModel } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { Todo } from '../entities/todo.entity';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { TodoIdNotFoud } from '../config/return-code/response.config';

@Injectable()
export class TodoCommand implements TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoEntityRepository: Repository<Todo>,
    private readonly exceptionsService: ExceptionsService<any>,
  ) {}

  async updateContent(id: number, isDone: boolean): Promise<void> {
    await this.todoEntityRepository.update(
      {
        id: id,
      },
      { isDone: isDone },
    );
  }
  async insert(todo: TodoModel): Promise<TodoModel> {
    const todoEntity = this.toTodoEntity(todo);
    const result = await this.todoEntityRepository.insert(todoEntity);
    console.log('xcxcxc', result.generatedMaps[0]);
    return this.toTodo(result.generatedMaps[0] as Todo);
  }
  async findAll(): Promise<TodoModel[]> {
    const todosEntity = await this.todoEntityRepository.find();
    return todosEntity.map((todoEntity) => this.toTodo(todoEntity));
  }
  async findById(id: number): Promise<TodoModel> {
    const todoEntity = await this.todoEntityRepository.findOneBy({ id: id });
    if (todoEntity === null) {
      this.exceptionsService.badRequestException(TodoIdNotFoud);
    }
    return this.toTodo(todoEntity);
  }
  async deleteById(id: number): Promise<void> {
    const checkTodoId = await this.todoEntityRepository.findOneBy({ id: id });
    if (checkTodoId === null) {
      this.exceptionsService.badRequestException(TodoIdNotFoud);
    }
    await this.todoEntityRepository.delete({ id: id });
  }

  private toTodo(todoEntity: Todo): TodoModel {
    const todo: TodoModel = new TodoModel();

    todo.id = todoEntity.id;
    todo.content = todoEntity.content;
    todo.isDone = todoEntity.isDone;
    todo.createdate = todoEntity.createdate;
    todo.updateddate = todoEntity.updateddate;

    return todo;
  }

  private toTodoEntity(todo: TodoModel): Todo {
    const todoEntity: Todo = new Todo();

    todoEntity.id = todo.id;
    todoEntity.content = todo.content;
    todoEntity.isDone = todo.isDone;
    todoEntity.createdate = new Date();

    return todoEntity;
  }
}
