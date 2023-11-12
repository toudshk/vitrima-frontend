import React from 'react'
import styles from './page.module.scss'
import { NextPageAuth } from '@/components/shared/types/auth.types'
const page: NextPageAuth = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
photo
        </div>
        <div className={styles.rightBlock}>
other info

        </div>
    </div>
  )
}
page.isOnlyAdmin = true

export default page