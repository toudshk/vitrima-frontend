"use client";

import { NextPageAuth } from "@/components/shared/types/auth.types";
import React, { useState } from "react";
import clsx from 'clsx'
import { Meta } from "@/utils/meta";
import styles from "./SettingsProfile.module.scss";

import PersonalInfo from "./personal-information/PersonalInfo";
import ServiceAndPrice from "./service-and-price/ServiceAndPrice";
const SettingsProfile: NextPageAuth<{user: any}> = ({user}) => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [activeTab, setActiveTab] = useState('personal-info');

  const handleNavigation = (target: string) => {
    setActiveTab(target);
    
    if (target === 'personal-info') {
      setShowPersonalInfo(true);
    } else if (target === 'works') {
      setShowPersonalInfo(false);
    }
  };

  return (
    <Meta title="Profile">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <ul>
            <li className={clsx({ [styles.active]: activeTab === 'personal-info' })}>
              <a href='#personal-info' onClick={() => handleNavigation('personal-info')}>
                Личная информация
              </a>
            </li>
            <li className={clsx({ [styles.active]: activeTab === 'works' })}>
              <a href='#works' onClick={() => handleNavigation('works')}>
                Услуги и цены
              </a>
            </li>
          </ul>
        </div>

        {showPersonalInfo ? <PersonalInfo /> : <ServiceAndPrice user={user}/>}
      </div>
    </Meta>
  );
};

export default SettingsProfile;
