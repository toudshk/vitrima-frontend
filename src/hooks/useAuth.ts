import { useTypedSelector } from './useTypedSelector'

// export const useAuth = () => useTypedSelector((state) => state.applicant)


export const useAuth = () => {
    const { applicant, contractor } = useTypedSelector((state) => ({
      applicant: state.applicant,
      contractor: state.contractor,
    }));
  
    // Now you can access applicant and contractor properties
    // ...
  };