"use client"
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { NextPageAuth } from '@/components/shared/types/auth.types';
import { Meta } from '@/utils/meta/Meta';
import Statistics from '@/components/screens/statistics/Statistics';
import AdminNavigation from '@/components/ui/Admin-navigation/AdminNavigation';
import { useAuth } from '@/hooks/useAuth';

const page: NextPageAuth = () => {
  

  return (
    <>
      <Meta title="Админ панель">
        <AdminNavigation />
        <Statistics />
      </Meta>
    </>
  );
};

export default page;
