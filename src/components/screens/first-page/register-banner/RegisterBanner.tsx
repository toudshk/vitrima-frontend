import React from 'react'
import styles from './RegisterBanner.module.scss'
import Link from 'next/link'
const RegisterBanner = () => {
  return (
    <div className={styles.container}>
        <div>
        <h1 >Зарегистрируйтесь, чтобы смотреть ленту</h1>
        <Link href={'/signup'}>Зарегистрироваться</Link>
        </div>
    </div>
  )
}

export default RegisterBanner