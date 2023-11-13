import { Controller, Get } from '@nestjs/common';
@Controller('users')
export class UserController {
  @Get('')
  async getAllUsers() {
    // const result = await this.getUserUsecaseProxy.getInstance().execute();

    return 'ok';
  }
}
