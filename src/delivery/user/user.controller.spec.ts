import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('getAllUsers', () => {
    it('should return "ok"', async () => {
      const result = await userController.getAllUsers();
      expect(result).toBe('ok');
    });
  });
});
