import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TodoCommand } from './todo.repository';
import { Todo } from '../entities/todo.entity';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { TodoIdNotFoud, success } from '../config/return-code/response.config';
import { TodoModel } from '../../domain/model/todo';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TodoCommand', () => {
  let todoCommand: TodoCommand;
  let todoEntityRepositoryMock: Repository<Todo>;
  let exceptionsServiceMock: ExceptionsService<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoCommand,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
        {
          provide: ExceptionsService,
          useValue: {
            badRequestException: jest.fn(),
          },
        },
      ],
    }).compile();

    todoCommand = module.get<TodoCommand>(TodoCommand);
    todoEntityRepositoryMock = module.get<Repository<Todo>>(
      getRepositoryToken(Todo),
    );
    exceptionsServiceMock =
      module.get<ExceptionsService<any>>(ExceptionsService);
  });

  it('should be defined', () => {
    expect(todoCommand).toBeDefined();
  });

  describe('updateContent', () => {
    it('should update content', async () => {
      const updateSpy = jest
        .spyOn(todoEntityRepositoryMock, 'update')
        .mockResolvedValue(undefined);

      await todoCommand.updateContent(1, true);

      expect(updateSpy).toHaveBeenCalledWith({ id: 1 }, { isDone: true });
    });
  });

  describe('findById', () => {
    it('should throw badRequestException when todoEntity is null', async () => {
      // Mock findOneBy method to return null
      jest.spyOn(todoEntityRepositoryMock, 'findOneBy').mockResolvedValue(null);

      // Mock badRequestException method
      const badRequestExceptionSpy = jest.spyOn(
        exceptionsServiceMock,
        'badRequestException',
      );

      // Execute the method
      await expect(todoCommand.findById(1)).rejects.toThrow();

      // Check that badRequestException was called with the correct argument
      expect(badRequestExceptionSpy).toHaveBeenCalledWith(TodoIdNotFoud);
    });

    it('should return todoModel when todoEntity is not null', async () => {
      const todoEntity: Todo = {
        id: 1,
        content: 'Test Find By ID',
        isDone: false,
        createdate: new Date(),
        updateddate: new Date(),
      };
      jest
        .spyOn(todoEntityRepositoryMock, 'findOneBy')
        .mockResolvedValue(todoEntity);

      const result = await todoCommand.findById(1);
      expect(result).toEqual({
        id: todoEntity.id,
        content: todoEntity.content,
        isDone: todoEntity.isDone,
        createdate: todoEntity.createdate,
        updateddate: todoEntity.updateddate,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of TodoModel', async () => {
      const todoEntities: Todo[] = [
        {
          id: 1,
          content: 'Test Find All',
          isDone: false,
          createdate: new Date(),
          updateddate: new Date(),
        },
        {
          id: 2,
          content: 'Test Find All',
          isDone: false,
          createdate: new Date(),
          updateddate: new Date(),
        },
      ];
      jest
        .spyOn(todoEntityRepositoryMock, 'find')
        .mockResolvedValue(todoEntities);

      const result = await todoCommand.findAll();

      expect(Array.isArray(result)).toBe(true);

      result.forEach((todoModel, index) => {
        expect(todoModel).toEqual({
          id: todoEntities[index].id,
          content: todoEntities[index].content,
          isDone: todoEntities[index].isDone,
          createdate: todoEntities[index].createdate,
          updateddate: todoEntities[index].updateddate,
        });
      });
    });
  });

  describe('deleteById', () => {
    it('should throw badRequestException when checkTodoId is null', async () => {
      // Mock findOneBy method to return null
      jest.spyOn(todoEntityRepositoryMock, 'findOneBy').mockResolvedValue(null);

      // Mock badRequestException method
      const badRequestExceptionSpy = jest.spyOn(
        exceptionsServiceMock,
        'badRequestException',
      );

      // Execute the method
      await expect(todoCommand.deleteById(1)).rejects.toThrow();

      // Check that badRequestException was called with the correct argument
      expect(badRequestExceptionSpy).toHaveBeenCalledWith(TodoIdNotFoud);
    });

    it('should delete todo when checkTodoId is not null', async () => {
      // Mock findOneBy method to return a non-null value
      const todoEntity: Todo = {
        id: 1,
        content: 'Test Find All',
        isDone: false,
        createdate: new Date(),
        updateddate: new Date(),
      };
      jest
        .spyOn(todoEntityRepositoryMock, 'findOneBy')
        .mockResolvedValue(todoEntity);

      const deleteSpy = jest
        .spyOn(todoEntityRepositoryMock, 'delete')
        .mockResolvedValue(undefined);

      await todoCommand.deleteById(1);
      expect(todoEntityRepositoryMock.findOneBy).toHaveBeenCalledWith({
        id: 1,
      });
      expect(deleteSpy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
