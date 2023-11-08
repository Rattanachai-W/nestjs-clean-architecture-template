import { TodoModel } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class FindOneTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: number): Promise<TodoModel> {
    return await this.todoRepository.findById(id);
  }
}
