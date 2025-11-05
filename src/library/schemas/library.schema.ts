/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ versionKey: false, timestamps: true })

export class Library extends Document {
    @Prop()
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'Book', default: [] })
    books: Types.ObjectId[];
};

export const LibrarySchema = SchemaFactory.createForClass(Library);