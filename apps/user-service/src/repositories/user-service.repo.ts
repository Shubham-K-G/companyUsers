import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(user: User): Promise<User> {
        try {
            const newCompany = new this.userModel(user);
            return await newCompany.save();
        } catch(error) {
            console.log(error);
            throw new BadRequestException("error occured while creating user in db");
        }
        
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User> ,user: Partial<User>): Promise<User> {
        try {
            return await this.userModel.findOneAndUpdate(userFilterQuery, user);
        } catch (error) {
            console.log(error);
            throw new BadRequestException("error occured while updating user in db");
        }   
    }

    async findAll(userFilterQuery: FilterQuery<User>): Promise<User[]> {
        try {
            if(userFilterQuery) return await this.userModel.find(userFilterQuery);
            else return await this.userModel.find(); 
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Error occured while finding user/users in the db");
        }  
    }
}