import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionsService } from './exceptions.service';
import {
  InternaleServerError,
  success,
  forbiddenError,
  UnauthorizedError,
} from '../config/return-code/response.config';

describe('ExceptionsService', () => {
  let exceptionsService: ExceptionsService<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionsService],
    }).compile();

    exceptionsService = module.get<ExceptionsService<any>>(ExceptionsService);
  });

  it('should create a BadRequestException with the provided data', () => {
    expect(() =>
      exceptionsService.badRequestException(InternaleServerError),
    ).toThrow(BadRequestException);
    try {
      exceptionsService.badRequestException(InternaleServerError);
    } catch (error) {
      expect(error.getResponse()).toEqual(InternaleServerError);
    }
  });

  it('should create an InternalServerErrorException with the provided data', () => {
    expect(() =>
      exceptionsService.internalServerErrorException(InternaleServerError),
    ).toThrow(InternalServerErrorException);
    try {
      exceptionsService.internalServerErrorException(InternaleServerError);
    } catch (error) {
      expect(error.getResponse()).toEqual(InternaleServerError);
    }
  });

  it('should create a ForbiddenException with the provided data', () => {
    expect(() => exceptionsService.forbiddenException(forbiddenError)).toThrow(
      ForbiddenException,
    );
    try {
      exceptionsService.forbiddenException(forbiddenError);
    } catch (error) {
      expect(error.getResponse()).toEqual(forbiddenError);
    }
  });

  it('should create an UnauthorizedException with the provided data', () => {
    expect(() =>
      exceptionsService.UnauthorizedException(UnauthorizedError),
    ).toThrow(UnauthorizedException);
    try {
      exceptionsService.UnauthorizedException(UnauthorizedError);
    } catch (error) {
      expect(error.getResponse()).toEqual(UnauthorizedError);
    }
  });

  it('should set data on success response', () => {
    const responseData = { some: 'mockup data' };

    const result = exceptionsService.toResponseSuccess(success, responseData);

    expect(result).toEqual({
      ...success,
      data: responseData,
    });
  });
});
