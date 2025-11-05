/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Developer } from './schemas/developer.schema';
import { Project } from './schemas/project.schema';
import type { IProject } from './interfaces/project.interfaces';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { };

    @Post('/developer')
    createDeveloper(@Body() data: Developer) {
        return this.projectService.seedDeveloper(data)
    }

    @Post()
    createProject(@Body() data: Project) {
        return this.projectService.seedProject(data)
    }

    @Patch("/assign")
    updateProDev(@Body() data: IProject) {
        return this.projectService.devProjectInsert(data);
    }

    @Get()
    getProjects() {
        return this.projectService.getProjects();
    }

    @Get('/developer')
    getDeveloper() {
        return this.projectService.getDevelopers();
    }
}
