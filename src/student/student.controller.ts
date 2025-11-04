/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { };

    @Get()
    async getAllStudent() {
        return this.studentService.getAllStudent();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: string) {
        return this.studentService.getStudentById(id);
    }

    @Post()
    async addStudent(@Body() data: Partial<Student>) {
        return this.studentService.createStudent(data);
    }

    @Patch(':id')
    async updateStudentById(@Body() data: Partial<Student>, @Param('id') id: string) {
        return this.studentService.updateStudentById(id, data);
    }
}
