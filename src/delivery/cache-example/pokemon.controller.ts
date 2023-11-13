import {
  Controller,
  Inject,
  Query,
  Get,
  ParseIntPipe,
  UseInterceptors,
  CACHE_MANAGER,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5) //TTL to 5s override seconds
  @Get('find')
  async getPokemonById(@Query('id', ParseIntPipe) id: number): Promise<any> {
    const CheckData = await this.cacheService.get(id.toString());
    console.log('CheckData', CheckData);

    if (CheckData !== null) {
      const cachedData = await this.cacheService.get(id.toString());
      console.log('Data from Cache.');
      return cachedData; //--> data.name;
    }

    console.log('Set new data');

    const { data } = await this.httpService.axiosRef.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    await this.cacheService.set(id.toString(), data.name);

    return data.name;
  }
}
