import { Test, TestingModule } from '@nestjs/testing';
import { CompanyServiceService } from '../services/company-service.service';
import { CompanyServiceController } from './company-service.controller';

describe('CompanyServiceController', () => {
  let companyServiceController: CompanyServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompanyServiceController],
      providers: [CompanyServiceService],
    }).compile();

    companyServiceController = app.get<CompanyServiceController>(CompanyServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(companyServiceController.getHello()).toBe('Hello World!');
    });
  });
});
