"use client"
import React, { FC, useEffect, useState } from 'react';
import styles from './PopUp.module.scss'; // Импортируйте стили
import Image from 'next/image'; // Если вы используете Next.js
import SkeletonLoader from '@/components/ui/skeleton-loader/skeletonLoader';

const Popup:FC<{isSubTypeLoading: boolean, currentSubType: any}> = ({ isSubTypeLoading, currentSubType }) => {

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (currentSubType !== null) {
      setIsVisible(true);
      
    } else {
      setIsVisible(false);
    }
  }, [currentSubType]);

  return (
    <div
      className={styles.popupContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className={`${styles.imageBlock} ${isVisible ? styles.visible : styles.hidden}`}>
        {isSubTypeLoading ? (
          <SkeletonLoader count={1} />
        ) : (
          currentSubType !== null && (
            <Image
              src={currentSubType.image}
              width={300}
              height={200}
              alt=""
              className={`transition-opacity opacity-0 duration-[0.7s] mb-[2vw] w-full ${isVisible ? 'opacity-100' : ''}`}
              onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            />
          )
        )}
        <h2 className={styles.title}>{currentSubType?.label}</h2>
        <p className={styles.subscription}>{currentSubType?.description}</p>
      </div>
    </div>
  );
};

export default Popup;
