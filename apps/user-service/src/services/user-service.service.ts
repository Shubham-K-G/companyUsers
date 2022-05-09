import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FilterQuery } from 'mongoose';
import { UserRepository } from '../repositories/user-service.repo';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserServiceService {
  constructor(private readonly userRepository: UserRepository) {}
  
  async createUser(user: User): Promise<User> {
    return await this.userRepository.createUser(user);
  }

  async findOneAndUpdate(userFilterQuery: FilterQuery<User> ,user: Partial<User>): Promise<User> {
    return await this.userRepository.findOneAndUpdate(userFilterQuery,user);
  } 

  async findAllUserByCompany(companyName: string): Promise<User[]> {
    const response = await axios.get(String(process.env.COMPANY_SERVICE_DNS) + `/company/search?name=${companyName}`);
    const companyId = response.data[0]._id;
    return await this.userRepository.findAll({companyId});
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.findAll({});
  }
    
}
