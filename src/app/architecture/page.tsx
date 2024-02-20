import React from 'react'
import styles from './page.module.scss'
import Gallery from '@/components/screens/main-page/Gallery'
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
export default function Page() {
  const { user } = useAuth();
  if (!user) {
    redirect("/");
  }
  return (
    <>
        <div className={styles.container}>
          <div className={styles.title}>Архитектура</div>
          <Gallery slug={'architecture'}/>
        </div>
     
    </>
  );
}