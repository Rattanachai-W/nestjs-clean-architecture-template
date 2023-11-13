import { addTodoUseCases } from './addTodo.usecases';
import { InterfaceLogger } from '../../domain/logger/logger.interface';
import { TodoModel } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { DeleteTodoUseCases } from './deleteTodo.usecases';
import { FindAllUseCases } from './findAllTodo.usecase';
import { FindOneTodoUsecase } from './findOneTodo.usecases';
import { UpdateTodoUseCases } from './updateTodo.usecases';

describe('addTodoUseCases', () => {
  let addTodoUseCase: addTodoUseCases;
  let deleteTodoUseCaes: DeleteTodoUseCases;
  let findAllUsecase: FindAllUseCases;
  let loggerMock: InterfaceLogger;
  let todoRepositoryMock: TodoRepository;
  let findOneTodoUsecase: FindOneTodoUsecase;
  let updateUsecase: UpdateTodoUseCases;
  beforeEach(() => {
    loggerMock = {
      debug: jest.fn(),
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      verbose: jest.fn(),
    };

    todoRepositoryMock: todoRepositoryMock = {
      insert: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      deleteById: jest.fn(),
      updateContent: jest.fn(),
    };

    addTodoUseCase = new addTodoUseCases(loggerMock, todoRepositoryMock);
    deleteTodoUseCaes = new DeleteTodoUseCases(loggerMock, todoRepositoryMock);
    findAllUsecase = new FindAllUseCases(todoRepositoryMock);
    findOneTodoUsecase = new FindOneTodoUsecase(todoRepositoryMock);
    updateUsecase = new UpdateTodoUseCases(loggerMock, todoRepositoryMock);
  });

  it('should add a new todo and return the result', async () => {
    const content = 'New todo';
    const todoModel = new TodoModel();
    todoModel.content = content;
    todoModel.isDone = false;
    jest.spyOn(todoRepositoryMock, 'insert').mockResolvedValue(todoModel);
    const result = await addTodoUseCase.execute(content);
    expect(todoRepositoryMock.insert).toHaveBeenCalledWith(todoModel);
    expect(loggerMock.debug).toHaveBeenCalledWith(
      'addTodoUseCases execute',
      'New todo have been inserted',
    );
    expect(result).toEqual(todoModel);
  });

  it('should delete a todo by ID', async () => {
    const todoId = 1;
    await deleteTodoUseCaes.execute(todoId);

    expect(todoRepositoryMock.deleteById).toHaveBeenCalledWith(todoId);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'deleteTodoUseCases execute',
      `Todo ${todoId} have been deleted`,
    );
  });

  it('should return an array of TodoModel', async () => {
    const expectedTodoModels: TodoModel[] = [
      {
        id: 1,
        content: 'Test Todo 1',
        isDone: true,
        createdate: new Date(),
        updateddate: new Date(),
      },
      {
        id: 2,
        content: 'Test Todo 2',
        isDone: true,
        createdate: new Date(),
        updateddate: new Date(),
      },
    ];

    (todoRepositoryMock.findAll as jest.Mock).mockResolvedValueOnce(
      expectedTodoModels,
    );

    const result = await findAllUsecase.execute();

    expect(result).toEqual(expectedTodoModels);
    expect(todoRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return a TodoModel for a given ID', async () => {
    const expectedTodoModel: TodoModel = {
      id: 1,
      content: 'Test Todo 1',
      isDone: false,
      createdate: new Date(),
      updateddate: new Date(),
    };
    (todoRepositoryMock.findById as jest.Mock).mockResolvedValueOnce(
      expectedTodoModel,
    );

    const result = await findOneTodoUsecase.execute(1);

    expect(result).toEqual(expectedTodoModel);
    expect(todoRepositoryMock.findById).toHaveBeenCalledWith(1);
    expect(todoRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });

  it('should update the content of a Todo', async () => {
    // Arrange
    const todoId = 1;
    const isDone = true;

    // Act
    await updateUsecase.execute(todoId, isDone);

    // Assert
    expect(todoRepositoryMock.updateContent).toHaveBeenCalledWith(
      todoId,
      isDone,
    );
    expect(todoRepositoryMock.updateContent).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'updateTodoUseCases execute',
      `Todo ${todoId} have been updated`,
    );
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
  });
});
