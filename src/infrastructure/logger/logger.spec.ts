import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should log debug messages in development environment', () => {
    const debugSpy = jest.spyOn(loggerService, 'debug');

    loggerService.debug('test-context', 'Test debug message');

    expect(debugSpy).toHaveBeenCalledWith('test-context', 'Test debug message');
  });

  it('should log info messages', () => {
    const logSpy = jest.spyOn(loggerService, 'log');

    loggerService.log('test-context', 'Test info message');

    expect(logSpy).toHaveBeenCalledWith('test-context', 'Test info message');
  });

  it('should log error messages with optional trace', () => {
    const errorSpy = jest.spyOn(loggerService, 'error');

    loggerService.error('test-context', 'Test error message', 'stack-trace');

    expect(errorSpy).toHaveBeenCalledWith(
      'test-context',
      'Test error message',
      'stack-trace',
    );
  });

  it('should log warn messages', () => {
    const warnSpy = jest.spyOn(loggerService, 'warn');

    loggerService.warn('test-context', 'Test warn message');

    expect(warnSpy).toHaveBeenCalledWith('test-context', 'Test warn message');
  });

  it('should log verbose messages in non-production environment', () => {
    process.env.NODE_ENV = 'development';

    const verboseSpy = jest.spyOn(loggerService, 'verbose');

    loggerService.verbose('test-context', 'Test verbose message');

    expect(verboseSpy).toHaveBeenCalledWith(
      'test-context',
      'Test verbose message',
    );
  });
});
