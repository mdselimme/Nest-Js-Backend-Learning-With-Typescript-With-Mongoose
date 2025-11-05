/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false, timestamps: true })

export class Book extends Document {
    @Prop()
    title: string;

    @Prop()
    author: string;
};

export const BookSchema = SchemaFactory.createForClass(Book);