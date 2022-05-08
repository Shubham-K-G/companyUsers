import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Company } from '../schemas/company.schema';
import { CompanyServiceService } from '../services/company-service.service';

@Controller('/company')
export class CompanyServiceController {
  constructor(private readonly companyServiceService: CompanyServiceService) {}

  @Post('/create')
  async createCompany(@Body() company: Company): Promise<Company>{
    return await this.companyServiceService.createCompany(company);
  }

  @Put('/update')
  async updateCompany(@Query('id') _id: string, @Body() company: Partial<Company>) :Promise<Company> {
    return await this.companyServiceService.findOneAndUpdate({_id},company);
  }

  @Get("/search")
  async getAllCompanies(@Query('name') companyName: string): Promise<Company[]> {
    return await this.companyServiceService.findAll({companyName});
  }
}
