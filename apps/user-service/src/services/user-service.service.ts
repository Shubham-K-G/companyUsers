import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { FilterQuery } from 'mongoose';
import { UserRepository } from '../repositories/user-service.repo';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserServiceService {
  constructor(private readonly userRepository: UserRepository) {}
  
  async createUser(user: User): Promise<User> {
    let response;
    try{
      response = await axios.get(String(process.env.COMPANY_SERVICE_DNS) + `/company/search?_id=${user.companyId}`);
    } catch(error) {
      console.log(error);
    }
    if(response && response.data && response.data.length > 0 && response.data[0]._id === user.companyId) {
      return await this.userRepository.createUser(user);
    } else {
      throw new BadRequestException("Company Not present in DB");
    }
    
  }

  async findOneAndUpdate(userFilterQuery: FilterQuery<User> ,user: Partial<User>): Promise<User> {
    return await this.userRepository.findOneAndUpdate(userFilterQuery,user);
  } 

  async findAllUserByCompany(companyName: string): Promise<User[]> {
    let response, companyId;
    try{
      response = await axios.get(String(process.env.COMPANY_SERVICE_DNS) + `/company/search?companyName=${companyName}`);  
    } catch(error) {
      console.log(error);
    }
    if(response && response.data && response.data.lenght>0) {
      companyId = response.data[0]._id;
      return await this.userRepository.findAll({companyId});
    } else {
      return [];
    }
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.findAll({});
  }
    
}
