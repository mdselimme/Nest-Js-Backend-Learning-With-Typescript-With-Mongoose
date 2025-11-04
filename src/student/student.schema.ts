/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type StudentDocument = HydratedDocument<Student>

@Schema({ timestamps: true, versionKey: false })
export class Student {
    @Prop({ required: [true, "name is required."], trim: true })
    name: string;

    @Prop({ required: true })
    age: number;

    @Prop({ unique: true })
    email?: string;
};

export const StudentSchema = SchemaFactory.createForClass(Student);