/* eslint-disable prettier/prettier */
import { Prop, Schema } from "@nestjs/mongoose";


@Schema({ versionKey: false })
export class Tag {
    @Prop()
    name: string;
}