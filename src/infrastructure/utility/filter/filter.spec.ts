import { Test, TestingModule } from '@nestjs/testing';
import { HttpExceptionFilter } from './http-exception.filter';
import { HttpException } from '@nestjs/common';
import { InternaleServerError } from '../../config/return-code/response.config';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();

    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe('catch', () => {
    it('should handle HttpException and send 500 InternaleServerError', () => {
      const exception = new HttpException('Test Error', 400);
      const response = {
        status: jest.fn(() => response),
        json: jest.fn(),
      } as any;

      const host = {
        switchToHttp: () => ({ getResponse: () => response }),
      } as any;

      filter.catch(exception, host);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith(InternaleServerError);
    });
  });
});
