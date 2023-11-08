import { TodoM } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class FindOneTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: number): Promise<TodoM> {
    return await this.todoRepository.findById(id);
  }
}
