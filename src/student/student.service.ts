/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    async createStudent(data: Partial<Student>): Promise<Student> {
        const newStudent = new this.studentModel(data);
        return newStudent.save();
    };

    async getAllStudent(): Promise<Student[]> {
        const allStudent = this.studentModel.find().exec();
        return allStudent;
    };

    async getStudentById(id: string): Promise<Student | string> {
        const existingStudent = await this.studentModel.findById(id).exec();
        if (!existingStudent) {
            throw new NotFoundException(`Student #${id} not found`);
        }
        return existingStudent;
    };

    async updateStudentById(id: string, data: Partial<Student>): Promise<Student> {
        const updateStudent = await this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updateStudent) {
            throw new NotFoundException(`Student #${id} not found`);
        }
        return updateStudent;
    }

    async updateStudent(id: string, data: Partial<Student>): Promise<Student> {
        const updateStudent = await this.studentModel.findByIdAndUpdate(id, {
            name: data.name ?? null,
            age: data.age ?? null,
            email: data.email ?? null
        }, { new: true, overwrite: true });
        if (!updateStudent) {
            throw new NotFoundException(`Student #${id} not found`);
        }
        return updateStudent;
    }
}
