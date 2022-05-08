import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(user: User): Promise<User> {
        const newCompany = new this.userModel(user);
        return await newCompany.save();
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User> ,user: Partial<User>): Promise<User> {
        return await this.userModel.findOneAndUpdate(userFilterQuery, user);
    }

    async findAll(userFilterQuery: FilterQuery<User>): Promise<User[]> {
        if(userFilterQuery) return await this.userModel.find(userFilterQuery);
        else return await this.userModel.find(); 
    }
}