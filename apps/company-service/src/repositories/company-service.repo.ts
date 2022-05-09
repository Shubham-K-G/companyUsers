import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';

@Injectable()
export class CompanyRepository {
    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

    async createCompany(company: Company): Promise<Company> {
        try{
            const newCompany = new this.companyModel(company);
            return await newCompany.save();
        } catch(error) {
            console.log(error);
            throw new BadRequestException("error occured while creating company to db");
        }
        
    }

    async findOneAndUpdate(companyFilterQuery: FilterQuery<Company> ,company: Partial<Company>): Promise<Company> {
        try {
            return await this.companyModel.findOneAndUpdate(companyFilterQuery, company);
        } catch (error) {
            console.log(error);
            throw new BadRequestException("error occured while updating company in db");
        }
        
    }

    async findAll(companyFilterQuery: FilterQuery<Company>): Promise<Company[]> {
        try {
            if(!companyFilterQuery.companyName || companyFilterQuery.companyName === "") return await this.companyModel.find();
            else return await this.companyModel.find(companyFilterQuery);
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Error occured while finding company/companies in the db");
        }
        
    }
}