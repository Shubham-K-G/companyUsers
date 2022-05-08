import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceController } from '../src/controllers/user-service.controller';
import { UserServiceService } from '../src/services/user-service.service';

const user = {
  userName: 'Shubham',
  userContactNumber: '1234567892',
  companyId: '123dsfsgg',
};

describe('UserServiceController', () => {

  let userServiceController: UserServiceController;
  const mockUserService = {
    createUser: jest.fn().mockResolvedValue(user),
    findOneAndUpdate: jest.fn().mockResolvedValue(user),
    findAllUserByCompany: jest.fn().mockResolvedValue([user])
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserServiceController],
      providers: [UserServiceService],
    }).overrideProvider(UserServiceService).useValue(mockUserService).compile();

    userServiceController = app.get<UserServiceController>(UserServiceController);
  });

  describe('createUser', () => {
    it('should return user', async () => {
      expect(await userServiceController.createUser(user)).toEqual(user);
    });
  });
});
