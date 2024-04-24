import {FC}from 'react'
import { useServicesPrice } from './UseServicesAndPrice'
import SkeletonLoader from '@/components/ui/skeleton-loader/skeletonLoader'
import styles from './SecondWorks.module.scss'
const ServiceAndPriceInProfile:FC = () => {
    const {data, isLoading} = useServicesPrice()
  return (
    <div className='mb-16'>
    {isLoading ? (
        <SkeletonLoader count={1} height={48} className="mt-4" />
      ) : (
        data?.map((item: any) => (
          <div key={item._id} className={styles.item}>
            <p className={styles.title}>{item.title}</p>
            <div className={styles.rightBlock}>
              <p className={styles.price}>{item.price} р/м²</p>
              
            </div>
          </div>
        ))
      )}
      </div>
  )
}

export default ServiceAndPriceInProfile