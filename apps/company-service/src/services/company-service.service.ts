import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CompanyRepository } from '../repositories/company-service.repo';
import { Company } from '../schemas/company.schema';

@Injectable()
export class CompanyServiceService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createCompany(company: Company): Promise<Company> {
    return await this.companyRepository.createCompany(company);
  }

  async findOneAndUpdate(companyFilterQuery: FilterQuery<Company> ,company: Partial<Company>): Promise<Company> {
    return await this.companyRepository.findOneAndUpdate(companyFilterQuery,company);
  }

  async findAll(companyFilterQuery: FilterQuery<Company>): Promise<Company[]> {
    return await this.companyRepository.findAll(companyFilterQuery);
  }
}
