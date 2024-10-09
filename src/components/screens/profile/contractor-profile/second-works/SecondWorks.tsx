"use client"
import React, { useState } from 'react'
import styles from './SecondWorks.module.scss'
import clsx from 'clsx'
import GalleryWorks from './GalleryWorks'
import ServiceAndPrice from '@/components/screens/settings-profile/service-and-price/ServiceAndPrice'
import { NextPageAuth } from '@/components/shared/types/auth.types'
import ServiceAndPriceInProfile from './ServiceAndPrice'
import AboutProfile from './about-profile/AboutProfile'
const SecondWorks : NextPageAuth<{userData:any}> = ({userData}) => {
  
  const [showDownloading, setShowDownloading] = useState('downloading');
  const [activeTab, setActiveTab] = useState('downloading')

 
  const handleNavigation = (target: string) => {
    setActiveTab(target);

    if (target === "downloading") {
      setShowDownloading("downloading");
    }  if (target === "price-service") {
      setShowDownloading("price-service");
    } if (target === "about") {
      setShowDownloading("about");
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
            <li className={clsx({ [styles.active]: activeTab === 'about' })}>
              <button  onClick={() => handleNavigation('about')}>
                О профиле
              </button>
            </li>
          </ul>
        </div>

        {showDownloading ==='downloading' && <GalleryWorks  />}
        {showDownloading === 'price-service' && <ServiceAndPriceInProfile/>}
        {showDownloading === 'about' && <AboutProfile userData={userData}/>}
      </div>

  );
}

export default SecondWorks