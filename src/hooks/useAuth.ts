import {
  IAuthApplicantResponse,
  IAuthContractorResponse,
} from "@/store/user/user.interface";
import { useTypedSelector } from "./useTypedSelector";

// export const useAuth = () => useTypedSelector((state) => state.applicant)

export const useAuth = () => {
  return useTypedSelector(
    (state: { applicant: any; contractor: any }) =>
      state.applicant || state.contractor || null
  );
};
