import { ButtonHTMLAttributes, FC } from 'react'
import clsx from 'clsx'
import styles from './MainButton.module.scss'

export interface 	IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SecondButton:FC<IButton> = ({children, className, ...rest}) => {
  return (
   <button {...rest}  className={clsx(styles.secondButton, className)}>{children}</button>
  )
}

export default SecondButton