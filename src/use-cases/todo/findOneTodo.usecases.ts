import { TodoM } from '../../domains/model/todo';
import { TodoRepository } from '../../domains/repositories/todo.repository';

export class FindOneTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: number): Promise<TodoM> {
    return await this.todoRepository.findById(id);
  }
}
