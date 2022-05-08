import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ collection: "companies" })
export class Company {

    @Prop({ required: true, unique: true })
    companyName: string;

    @Prop()
    location: string;

}

export const CompanySchema = SchemaFactory.createForClass(Company); 