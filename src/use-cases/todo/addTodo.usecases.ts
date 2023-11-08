import { ILogger } from '../../domains/logger/logger.interface';
import { TodoM } from '../../domains/model/todo';
import { TodoRepository } from '../../domains/repositories/todo.repository';

export class addTodoUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(content: string): Promise<TodoM> {
    const todo = new TodoM();
    todo.content = content;
    todo.isDone = false;
    const result = await this.todoRepository.insert(todo);
    this.logger.log('addTodoUseCases execute', 'New todo have been inserted');
    return result;
  }
}
