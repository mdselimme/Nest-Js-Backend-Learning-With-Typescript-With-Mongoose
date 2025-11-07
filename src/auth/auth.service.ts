import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt";
import { Auth, AuthDocument } from './user.schema';


@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth.name) private userModel: Model<AuthDocument>,
        private jwtService: JwtService
    ) { }
    async signup(data: { email: string, password: string }) {
        const hash = await bcrypt.hash(data.password, 10);
        const user = new this.userModel({ email: data.email, password: hash });
        return user.save();;
    }

    async login(data: { email: string, password: string }) {
        const user = await this.userModel.findOne({ email: data.email });
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            return null;
        }
        const payload = {
            email: user.email,
            userId: user._id
        };
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
