import { IProject } from "@/components/shared/types/project.types";

export interface IProjectAddInput
	extends Omit<IProject, '_id' > {
	
}