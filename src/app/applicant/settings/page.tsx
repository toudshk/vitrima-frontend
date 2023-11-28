"use client"
import SettingsProfileApplicant from '@/components/screens/profile/applicant-profile/settings-profile-applicant/SettingsProfileApplicant'
import { NextPageAuth } from '@/components/shared/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';


const page:NextPageAuth = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if (!user) {
    
    router.push('/');
   

  }



  return (
    <SettingsProfileApplicant />
  )
}



export default page