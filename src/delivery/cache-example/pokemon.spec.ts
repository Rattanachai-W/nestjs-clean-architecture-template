import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from 'cache-manager';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ParseIntPipe } from '@nestjs/common';

describe('PokemonController', () => {
  let pokemonController: PokemonController;
  let httpService: HttpService;
  let cacheService: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        HttpService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    pokemonController = module.get<PokemonController>(PokemonController);
    httpService = module.get<HttpService>(HttpService);
    cacheService = module.get<Cache>(CACHE_MANAGER);
  });

  describe('getPokemonById', () => {
    it('should return data from cache if available', async () => {
      const mockCachedData = 'Bulbasaur';
      (cacheService.get as jest.Mock).mockResolvedValueOnce(mockCachedData);

      const result = await pokemonController.getPokemonById(1);

      expect(result).toBe(mockCachedData);
      expect(cacheService.get).toHaveBeenCalledWith('1');
    });

    it('should fetch data from API and cache if not available in cache', async () => {
      const mockApiResponse = { data: { name: 'Bulbasaur' } };
      (httpService.axiosRef.get as jest.Mock).mockResolvedValueOnce(
        mockApiResponse,
        
      );

      const result = await pokemonController.getPokemonById(1);

      expect(result).toBe('Bulbasaur');
      expect(cacheService.set).toHaveBeenCalledWith('1', 'Bulbasaur');
    });
  });
});
