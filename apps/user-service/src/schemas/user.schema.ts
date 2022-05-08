import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: "users" })
export class User {

    @Prop({ required: true })
    userName: string;

    @Prop({required: true, length: 10})
    userContactNumber: string;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company'})
    companyId: string;

}

export const UserSchema = SchemaFactory.createForClass(User); 