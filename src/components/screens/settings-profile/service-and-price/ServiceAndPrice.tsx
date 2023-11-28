"use client"

import {FC, MouseEventHandler} from 'react'

import { useServicePrice } from './useServicePrice';

import EditIcon from './icon/EditIcon';
import SkeletonLoader from '@/components/ui/skeleton-loader/skeletonLoader';
import styles from './ServiceAndPrice.module.scss'
import MainButton from '@/components/ui/Button/MainButton';
const ServiceAndPrice: FC<{user: any}>  =  ({user}) => {
  const {
		createAsync,
		data,
		isLoading,
		deleteAsync,
		searchTerm,
		handleSearch,
	} = useServicePrice()
  
  
  return (
    <div>
      <button onClick={createAsync} className='mt-6 text-3xl border border-gray-600 p-2 rounded-xl hover:border-gray-400 hover:text-gray-400 transition transition duration-300 ease-in-out'>Добавить услугу</button>
    {isLoading ? (
      <SkeletonLoader count={1} height={48} className="mt-4" />
    ) : (
      data?.map((item: any) => (
        <div key={item._id} className={styles.item}>
          <p className={styles.title}>{item.title}</p>
          <div className={styles.rightBlock}>
            <p className={styles.price}>{item.price} Р</p>
            <EditIcon />
          </div>
        </div>
      ))
    )}
  </div>
  );
}

export default ServiceAndPrice