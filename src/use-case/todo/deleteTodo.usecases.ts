import { InterfaceLogger } from '../../domain/logger/logger.interface';
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class DeleteTodoUseCases {
  constructor(
    private readonly logger: InterfaceLogger,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
    this.logger.log(
      'deleteTodoUseCases execute',
      `Todo ${id} have been deleted`,
    );
  }
}
