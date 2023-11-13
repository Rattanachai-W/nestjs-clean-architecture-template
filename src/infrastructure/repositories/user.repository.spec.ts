import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryOrm } from './user.repository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

describe('UserRepositoryOrm', () => {
  let userRepositoryOrm: UserRepositoryOrm;
  let userRepositoryMock: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryOrm,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepositoryOrm = module.get<UserRepositoryOrm>(UserRepositoryOrm);
    userRepositoryMock = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('getAllUsers', () => {
    it('should return an array of UserM', async () => {
      const mockUserEntities: User[] = [
        {
          id: 1,
          email: 'test@test.com',
          name: 'Test User',
          password: 'password',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest
        .spyOn(userRepositoryMock, 'find')
        .mockResolvedValue(mockUserEntities);

      const result = await userRepositoryOrm.getAllUsers();

      expect(userRepositoryMock.find).toHaveBeenCalled();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
