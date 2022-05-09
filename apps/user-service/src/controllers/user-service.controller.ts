import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UserServiceService } from '../services/user-service.service';

@Controller("/user")
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get("/search/:companyName")
  async searchUser(@Param("companyName") companyName: string): Promise<User[]> {
    return await this.userServiceService.findAllUserByCompany(companyName);
  }

  @Get("/all")
  async searchAllUser(): Promise<User[]> {
    return await this.userServiceService.findAllUser();
  }

  @Post('/create')
  async createUser(@Body() user: User): Promise<User>{
    return await this.userServiceService.createUser(user);
  }

  @Put('/update')
  async updateUser(@Query('id') _id: string, @Body() user: Partial<User>) :Promise<User> {
    return await this.userServiceService.findOneAndUpdate({_id},user);
  }
  
}
