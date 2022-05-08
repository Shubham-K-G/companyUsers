import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyServiceController } from './controllers/company-service.controller';
import { CompanyServiceService } from './services/company-service.service';
import { Company, CompanySchema } from './schemas/company.schema';
import { CompanyRepository } from './repositories/company-service.repo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(String(process.env.COMPANY_SERVICE_DB_CONNECTION)),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompanyServiceController],
  providers: [CompanyServiceService, CompanyRepository],
})
export class CompanyServiceModule {}
