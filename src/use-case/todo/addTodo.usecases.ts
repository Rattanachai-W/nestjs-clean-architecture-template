import { InterfaceLogger } from '../../domain/logger/logger.interface';
import { TodoModel } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class addTodoUseCases {
  constructor(
    private readonly logger: InterfaceLogger,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(content: string): Promise<TodoModel> {
    const todo = new TodoModel();
    todo.content = content;
    todo.isDone = false;
    const result = await this.todoRepository.insert(todo);
    this.logger.debug('addTodoUseCases execute', 'New todo have been inserted');
    return result;
  }
}
