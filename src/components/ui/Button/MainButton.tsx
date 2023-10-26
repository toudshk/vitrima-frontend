import { ButtonHTMLAttributes, FC } from 'react'
import clsx from 'clsx'
import styles from './MainButton.module.scss'

export interface 	IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MainButton:FC<IButton> = ({children, className, ...rest}) => {
  return (
   <button {...rest}  className={clsx(styles.button, className)}>{children}</button>
  )
}

export default MainButton