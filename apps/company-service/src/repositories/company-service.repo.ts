import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';

@Injectable()
export class CompanyRepository {
    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

    async createCompany(company: Company): Promise<Company> {
        const newCompany = new this.companyModel(company);
        return await newCompany.save();
    }

    async findOneAndUpdate(companyFilterQuery: FilterQuery<Company> ,company: Partial<Company>): Promise<Company> {
        return await this.companyModel.findOneAndUpdate(companyFilterQuery, company);
    }

    async findAll(companyFilterQuery: FilterQuery<Company>): Promise<Company[]> {
        if(!companyFilterQuery.companyName || companyFilterQuery.companyName === "") return await this.companyModel.find();
        else return await this.companyModel.find(companyFilterQuery);
    }
}