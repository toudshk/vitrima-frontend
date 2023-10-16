import { ButtonHTMLAttributes, FC } from 'react'
import clsx from 'clsx'
import styles from './MainButton.module.scss'

interface IButton{
  'text':string,
  'px': number
}
const MainButton:FC<IButton> = ({text, px}) => {
  return (
   <button   className={clsx(styles.button, `px-${px}`)}>{text}</button>
  )
}

export default MainButton