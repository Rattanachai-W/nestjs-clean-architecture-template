// import { ApiProperty } from '@nestjs/swagger';
import { TodoModel } from '../../../domain/model/todo';

export class TodoPresenter {
  // @ApiProperty()
  id: number;
  // @ApiProperty()
  content: string;
  // @ApiProperty()
  isDone: boolean;
  // @ApiProperty()
  createdate: Date;
  // @ApiProperty()
  updateddate: Date;
  // @ApiProperty()
  message: string;

  constructor(todo: TodoModel) {
    this.id = todo.id;
    this.content = todo.content;
    this.isDone = todo.isDone;
    this.createdate = todo.createdate;
    this.updateddate = todo.updateddate;
    // this.message = 'success';
  }
}
