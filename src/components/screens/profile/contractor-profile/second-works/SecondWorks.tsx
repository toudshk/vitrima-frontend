"use client"
import React, { useState } from 'react'
import styles from './SecondWorks.module.scss'
import clsx from 'clsx'
import GalleryWorks from './GalleryWorks'
import ServiceAndPrice from '@/components/screens/settings-profile/service-and-price/ServiceAndPrice'
import { NextPageAuth } from '@/components/shared/types/auth.types'
import ServiceAndPriceInProfile from './ServiceAndPrice'
const SecondWorks : NextPageAuth = () => {
  
  const [showDownloading, setShowDownloading] = useState(true);
  const [activeTab, setActiveTab] = useState('downloading')

  const handleNavigation = (target: string) => {
    setActiveTab(target);
    
    if (target === 'downloading') {
      setShowDownloading(true);
    } else if (target === 'price-service') {
      setShowDownloading(false);
    }
  };

  return (

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <ul>
            <li className={clsx({ [styles.active]: activeTab === 'downloading' })}>
              <button  onClick={() => handleNavigation('downloading')}>
                Загруженные
              </button>
            </li>
            <li className={clsx({ [styles.active]: activeTab === 'price-service' })}>
              <button onClick={() => handleNavigation('price-service')}>
                Услуги и цены
              </button>
            </li>
          </ul>
        </div>

        {showDownloading ? <GalleryWorks  /> : <ServiceAndPriceInProfile/>}
      </div>

  );
}

export default SecondWorks