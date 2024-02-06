import { ButtonHTMLAttributes, FC } from 'react'
import clsx from 'clsx'
import styles from './MainButton.module.scss'


const SecondButton:FC<any> = ({children, className, ...rest}) => {
  return (
   <button {...rest}  className={clsx(styles.secondButton, className)}>{children}</button>
  )
}

export default SecondButton