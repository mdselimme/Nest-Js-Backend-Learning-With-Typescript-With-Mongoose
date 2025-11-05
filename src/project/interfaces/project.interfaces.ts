/* eslint-disable prettier/prettier */
import { Types } from "mongoose";

export interface IProject {
    projectId: Types.ObjectId;
    developerId: Types.ObjectId;
};