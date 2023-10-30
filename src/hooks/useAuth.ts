import { IAuthApplicantResponse, IAuthContractorResponse } from '@/store/user/user.interface';
import { useTypedSelector } from './useTypedSelector'

// export const useAuth = () => useTypedSelector((state) => state.applicant)


export const useAuth = () => { 
  return useTypedSelector((state) => ({
      applicant: state.applicant ,
    contractor: state.contractor
    }));
  
    
  };