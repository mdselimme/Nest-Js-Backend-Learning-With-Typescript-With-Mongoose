import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type AuthDocument = Auth & Document;

@Schema({ versionKey: false, timestamps: true })
export class Auth {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, trim: true })
    password: string;
};

export const AuthSchema = SchemaFactory.createForClass(Auth);
