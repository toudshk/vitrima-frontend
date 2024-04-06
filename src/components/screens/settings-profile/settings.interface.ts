import {   IContractor } from "@/components/shared/types/user.types";

export interface ISettingsProfileInput extends Omit<IContractor, 'works' | 'isContractor' | 'isAdmin' | 'createdAt' | 'password' >{}