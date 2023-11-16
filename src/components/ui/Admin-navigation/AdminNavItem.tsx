"use client"
import {FC} from 'react'
import { INavItem } from './admin-navigation.interface'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {clsx} from 'clsx'
import styles from './AdminNavigation.module.scss'

const AdminNavItem:FC<{item: INavItem}> = ({item: {link, title}}) => {

    const pathname = usePathname()

  return (
    <li>
        <Link  href={link} className={clsx({
            [styles.active] : pathname === link 
        })}>{title}</Link>
    </li>
  )
}

export default AdminNavItem