import { Test, TestingModule } from '@nestjs/testing';
import { TimeoutInterceptor } from './timeout.interceptor';
import {
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { throwError, of, TimeoutError } from 'rxjs';
// import { LoggingInterceptor } from './logging.interceptor';
// import { LoggerService } from '../../logger/logger.service';

describe('TimeoutInterceptor', () => {
  let timeoutInterceptor: TimeoutInterceptor;
  let contextMock: ExecutionContext;
  let handlerMock: CallHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeoutInterceptor],
    }).compile();

    timeoutInterceptor = module.get<TimeoutInterceptor>(TimeoutInterceptor);

    contextMock = {} as ExecutionContext;
    handlerMock = {
      handle: jest.fn(() => of('Response')),
    } as CallHandler;
  });

  it('should handle the request within the timeout', async () => {
    jest.spyOn(handlerMock, 'handle').mockReturnValueOnce(of('Response'));

    const result = await timeoutInterceptor.intercept(contextMock, handlerMock);

    expect(result).toBe('Response');
  });

  it('should throw RequestTimeoutException on timeout', async () => {
    jest
      .spyOn(handlerMock, 'handle')
      .mockReturnValueOnce(throwError(() => new TimeoutError()));

    const promise = timeoutInterceptor.intercept(contextMock, handlerMock);

    await expect(promise).rejects.toThrow(RequestTimeoutException);
  });

  it('should rethrow other errors', async () => {
    const error = new Error('Test Error');
    jest
      .spyOn(handlerMock, 'handle')
      .mockReturnValueOnce(throwError(() => error));

    const promise = timeoutInterceptor.intercept(contextMock, handlerMock);

    await expect(promise).rejects.toThrow(error);
  });

  // describe('LoggingInterceptor', () => {
  //   let loggingInterceptor: LoggingInterceptor;
  //   let loggerServiceMock: jest.Mocked<LoggerService>;
  //   let contextMock: ExecutionContext;
  //   let handlerMock: CallHandler;

  //   beforeEach(async () => {
  //     loggerServiceMock = {
  //       verbose: jest.fn(),
  //       debug: jest.fn(),
  //       warn: jest.fn(),
  //       error: jest.fn(),
  //       log: jest.fn(),
  //     } as unknown as jest.Mocked<LoggerService>;

  //     contextMock = {
  //       switchToHttp: jest.fn(() => ({
  //         getRequest: jest.fn(() => ({
  //           path: '/example',
  //           method: 'GET',
  //           headers: { 'x-forwarded-for': 'client-ip' },
  //           connection: { remoteAddress: '127.0.0.1' },
  //         })),
  //       })),
  //     } as unknown as ExecutionContext;

  //     handlerMock = {
  //       handle: jest.fn(() => of('Response')),
  //     } as CallHandler;

  //     const module: TestingModule = await Test.createTestingModule({
  //       providers: [
  //         LoggingInterceptor,
  //         {
  //           provide: LoggerService,
  //           useValue: loggerServiceMock,
  //         },
  //       ],
  //     }).compile();

  //     loggingInterceptor = module.get<LoggingInterceptor>(LoggingInterceptor);
  //   });

  //   it('should log incoming and end request information', async () => {
  //     // Act
  //     await loggingInterceptor.intercept(contextMock, handlerMock).toPromise();

  //     // Assert
  //     expect(loggerServiceMock.verbose).toHaveBeenCalledWith(
  //       'Incoming Request on /example',
  //       'method=GET ip=client-ip',
  //     );
  //     expect(loggerServiceMock.verbose).toHaveBeenCalledWith(
  //       'End Request for /example',
  //       expect.stringContaining('duration='),
  //     );
  //   });
  // });
});
