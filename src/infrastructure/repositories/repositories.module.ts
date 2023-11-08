import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { UserRepositoryOrm } from './user.repository';
import { Todo } from '../entities/todo.entity';
import { TodoCommand } from './todo.repository';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { SuccessResponseModule } from '../response/response.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Todo]),
    ExceptionsModule,
    SuccessResponseModule,
  ],
  providers: [UserRepositoryOrm, TodoCommand],
  exports: [UserRepositoryOrm, TodoCommand],
})
export class RepositoriesModule {}
