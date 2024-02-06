
import { FC } from "react";
import { useTypedSelector } from "./useTypedSelector";


export const useAuth = () => useTypedSelector((state) => state.applicant || state.contractor)
