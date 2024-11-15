import {  IChosenDesigners } from "@/components/shared/types/project.types";

export interface IDesignerInput extends Omit<IChosenDesigners, "_id" >{}