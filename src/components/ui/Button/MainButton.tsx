import { ButtonHTMLAttributes, FC } from 'react'

import styles from './MainButton.module.scss'

interface IButton{
  children: string
}
const MainButton:FC<IButton> = ({children}) => {
  return (
   <button   className={styles.button}>{children}</button>
  )
}

export default MainButton