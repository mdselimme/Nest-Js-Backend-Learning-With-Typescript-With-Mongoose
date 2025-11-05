/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Tag } from "./tag.schema";
import { Document } from "mongoose";




@Schema({ versionKey: false, timestamps: true })
export class Product extends Document {
    @Prop()
    title: string;

    @Prop({ type: [Tag] })
    tags: Tag[]
}

export const ProductSchema = SchemaFactory.createForClass(Product);