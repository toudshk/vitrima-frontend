import React from 'react'
import styles from './RegisterBanner.module.scss'
import Link from 'next/link'
const RegisterBanner = () => {
  return (
    <div className={styles.container}>
        <div>
        <h1 className='text-7xl text-primary'>Зарегистрируйтесь, чтобы смотреть ленту</h1>
        <Link href={''}>Зарегистрироваться</Link>
        </div>
    </div>
  )
}

export default RegisterBanner