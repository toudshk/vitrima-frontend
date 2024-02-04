import React from 'react'
import styles from './page.module.scss'
import Gallery from '@/components/screens/main-page/Gallery'
export default function Page() {
 
  return (
    <>
        <div className={styles.container}>
          <div className={styles.title}>Архитектура</div>
          <Gallery slug={'architecture'}/>
        </div>
     
    </>
  );
}