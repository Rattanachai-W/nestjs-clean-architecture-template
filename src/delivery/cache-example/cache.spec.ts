import { Test, TestingModule } from '@nestjs/testing';
import { CacheController } from './cache.controller';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

describe('CacheController', () => {
  let pokemonController: CacheController;
  let httpServiceMock: jest.Mocked<HttpService>;
  let cacheServiceMock: jest.Mocked<Cache>;

  beforeEach(async () => {
    interface CustomCache<T> {
      set: (key: string, value: unknown, ttl?: number) => Promise<void>;
      get: <T>(key: string) => Promise<T | undefined>;
      del: (key: string) => Promise<void>;
      reset: () => Promise<void>;
      wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T>;
      store: T;
    }

    httpServiceMock = {
      axiosRef: {
        get: jest.fn(),
        request: jest.fn(),
        delete: jest.fn(),
        head: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
      },
    } as jest.Mocked<HttpService>;

    cacheServiceMock = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      reset: jest.fn(),
      wrap: jest.fn(),
      store: jest.fn(),
    } as jest.Mocked<CustomCache<any>>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CacheController],
      providers: [
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheServiceMock,
        },
      ],
    }).compile();

    pokemonController = module.get<CacheController>(CacheController);
  });

  it('should return cached data if available', async () => {
    // Arrange
    const id = 1;
    const cachedData = 'Bulbasaur';
    cacheServiceMock.get.mockResolvedValueOnce(cachedData);

    // Act
    const result = await pokemonController.getPokemonById(id);

    // Assert
    expect(result).toBe(cachedData);
    expect(cacheServiceMock.get).toHaveBeenCalledWith(id.toString());
    expect(httpServiceMock.axiosRef.get).not.toHaveBeenCalled();
  });

  it('should fetch data from API and cache if not available in cache', async () => {
    // Arrange
    const id = 2;
    const apiResponse = { data: { name: 'Ivysaur' } };
    httpServiceMock.axiosRef.get.mockResolvedValueOnce(apiResponse);

    // Act
    const result = await pokemonController.getPokemonById(id);

    // Assert
    expect(result).toBe(apiResponse.data.name);
    expect(httpServiceMock.axiosRef.get).toHaveBeenCalledWith(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    expect(cacheServiceMock.set).toHaveBeenCalledWith(
      id.toString(),
      apiResponse.data.name,
    );
  });
});
