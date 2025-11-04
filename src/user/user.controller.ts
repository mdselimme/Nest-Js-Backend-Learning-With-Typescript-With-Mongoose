/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create() {
        return this.userService.createUser();
    }

    @Get()
    async getAll() {
        return this.userService.getAll()
    }
}
