import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Todo } from '../entities/todo.entity';
import { TodoCommand } from './todo.repository';
import { ExceptionsModule } from '../exceptions/exceptions.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Todo]),
    ExceptionsModule,
  ],
  providers: [TodoCommand],
  exports: [TodoCommand],
})
export class RepositoriesModule {}
