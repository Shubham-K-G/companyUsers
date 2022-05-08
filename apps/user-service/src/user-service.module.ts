import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserServiceController } from './controllers/user-service.controller';
import { UserRepository } from './repositories/user-service.repo';
import { User, UserSchema } from './schemas/user.schema';
import { UserServiceService } from './services/user-service.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(String(process.env.USER_SERVICE_DB_CONNECTION)),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService, UserRepository],
})
export class UserServiceModule {}
