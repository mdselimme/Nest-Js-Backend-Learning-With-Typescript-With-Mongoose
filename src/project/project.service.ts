/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from './schemas/developer.schema';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { IProject } from './interfaces/project.interfaces';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Developer.name) private developerModel: Model<Developer>,
        @InjectModel(Project.name) private projectModel: Model<Project>,
    ) { };

    async seedDeveloper(devData: Developer): Promise<Developer> {
        const developerSeed = new this.developerModel(devData);
        return await developerSeed.save();
    };

    async seedProject(projectData: Project): Promise<Project> {
        const projectSeed = new this.projectModel(projectData);
        return await projectSeed.save();
    };

    async devProjectInsert(data: IProject): Promise<Project> {
        const session = await this.projectModel.startSession();
        session.startTransaction();
        try {
            const developer = await this.developerModel.findByIdAndUpdate(
                data.developerId,
                { $push: { projects: data.projectId } },
                { new: true, session }
            );

            if (!developer) throw new Error('Developer not found');

            const project = await this.projectModel.findByIdAndUpdate(
                data.projectId,
                { $push: { developers: developer._id } },
                { new: true, session }
            );

            if (!project) throw new Error('Project not found');
            await session.commitTransaction();
            return project;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
    }

    async getProjects(): Promise<Project[]> {
        return await this.projectModel.find().populate('developers');
    }

    async getDevelopers(): Promise<Developer[]> {
        return await this.developerModel.find().populate('projects');
    }


}
