import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { isEmail } from 'validator';

export type UserDocument = User & Document;

@Schema({ collection: "users" })
export class User {

    @Prop({ required: true })
    userName: string;

    @Prop({required: true, minlength: 10, maxlength: 10})
    userContactNumber: string;

    @Prop({required: true, validate: [isEmail, 'invalid email'], unique: true})
    email: string;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company'})
    companyId: string;

}

export const UserSchema = SchemaFactory.createForClass(User); 