import { ITag } from "@/components/shared/types/work.types";

export interface ITagEditInput extends Omit<ITag, '_id'> {}