import { Controller, Get, Inject } from '@nestjs/common';
import { GetAllUserUseCases } from 'src/use-case/user/getAllUsers.usecase';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
// import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetAllUserUseCases>,
    private readonly exception: ExceptionsService, // private configService: ConfigService,
  ) {}

  @Get('')
  async getAllUsers() {
    const result = await this.getUserUsecaseProxy.getInstance().execute();

    return {
      status: 'OK',
      code: 200,
      message: process.env.DATABASE_NAME,
      data: result,
    };
  }
}
