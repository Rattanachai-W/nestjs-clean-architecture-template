/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { GetAllUserUseCases } from 'src/use-cases/getAllUsers.usecase';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UserRepositoryOrm } from '../repositories/user.repository';
import { UseCaseProxy } from './usecase-proxy';

@Module({
  imports: [RepositoriesModule],
})
export class UsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUserUseCases(userRepository)),
        },
      ],
      exports: [UsecaseProxyModule.GET_ALL_USERS_USE_CASE],
    };
  }
}
