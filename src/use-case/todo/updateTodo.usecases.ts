import { InterfaceLogger } from '../../domain/logger/logger.interface';
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class UpdateTodoUseCases {
  constructor(
    private readonly logger: InterfaceLogger,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: number, isDone: boolean): Promise<void> {
    await this.todoRepository.updateContent(id, isDone);
    this.logger.log(
      'updateTodoUseCases execute',
      `Todo ${id} have been updated`,
    );
  }
}
