"use client"
import { NextPage } from 'next';
import { redirect, useRouter } from 'next/navigation';
import { NextPageAuth } from '@/components/shared/types/auth.types';
import { Meta } from '@/utils/meta/Meta';
import Statistics from '@/components/screens/statistics/Statistics';
import AdminNavigation from '@/components/ui/Admin-navigation/AdminNavigation';
import { useAuth } from '@/hooks/useAuth';

const Page: NextPageAuth = () => {
  const { user } = useAuth();
  if (!user || user.isAdmin === false) {
    redirect("/");
  }

  return (
    <>
      <Meta title="Админ панель">
        <AdminNavigation />
        <Statistics />
      </Meta>
    </>
  );
};

export default Page;
