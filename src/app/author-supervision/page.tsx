"use client"
import { redirect, useRouter } from 'next/navigation';
import { NextPageAuth } from '@/components/shared/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import AuthorSupervision from '@/components/screens/author-supervision/AuthorSupervision';

const Page: NextPageAuth = () => {


  const router = useRouter()
// eslint-disable-next-line react-hooks/rules-of-hooks
const {user} = useAuth() 
if (!user || (user.isAdmin === false && user.isWorker === false)) {
  router.push('/');
}
  

  return (
    <AuthorSupervision />
  )
};

export default Page;
