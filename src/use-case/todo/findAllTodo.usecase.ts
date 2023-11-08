import { TodoM } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todo.repository';
export class FindAllUseCases {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(): Promise<TodoM[]> {
    return await this.todoRepository.findAll();
  }
}
