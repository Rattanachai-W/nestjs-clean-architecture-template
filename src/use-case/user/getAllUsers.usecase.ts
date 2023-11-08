import { UserM } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/user.repository';

export class GetAllUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<UserM[]> {
    return await this.usersRepository.getAllUsers();
  }
}
