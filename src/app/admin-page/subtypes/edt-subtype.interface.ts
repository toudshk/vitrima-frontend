import { ISubType } from "@/components/shared/types/work.types";

export interface ISubTypeEditInput extends Omit<ISubType, '_id'> {}