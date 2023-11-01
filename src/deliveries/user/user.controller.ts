import { Controller, Get, Inject } from '@nestjs/common';
import { GetAllUserUseCases } from 'src/use-cases/getAllUsers.usecase';
import { UseCaseProxy } from 'src/infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { ExceptionsService } from 'src/infrastructures/exceptions/exceptions.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetAllUserUseCases>,
    private readonly exception: ExceptionsService,
  ) {}

  @Get('')
  async getAllUsers() {
    // const result = await this.getUserUsecaseProxy.getInstance().execute();
    return {
      status: 'OK',
      code: 200,
      message: 'Get data success',
      // data: result,
    };
  }
}
