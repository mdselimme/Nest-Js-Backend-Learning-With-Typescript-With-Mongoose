/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(): Promise<User> {
        const user = new this.userModel({
            name: 'Selim',
            address: {
                street: '123 street',
                city: 'Dhaka'
            }
        });
        return await user.save();
    }

    async getAll(): Promise<User[]> {
        const user = this.userModel.find().exec();
        return user;
    }
}
