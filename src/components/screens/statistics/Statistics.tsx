import {FC} from 'react'
import styles from './statistcs.module.scss'
import CountUsers from './CountUsers'
const Statistics:FC = () => {
  return (
    <div className={styles.statistics}>
      <CountUsers />
    </div>
  )
}

export default Statistics