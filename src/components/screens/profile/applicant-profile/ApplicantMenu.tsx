"use client";
import { FC, useState } from "react";
import clsx from 'clsx'
import styles from './ApplicantProfile.module.scss'
import Subscription from "./Subscription";
import { IApplicant } from "@/components/shared/types/user.types";
import MasonryGallery from "@/components/ui/masonry/MasonryGallery";

interface IDataApplicant  {
  data: IApplicant
} 

const ApplicantMenu:FC<IDataApplicant> = ({data}) => {
  const [showDownloading, setShowDownloading] = useState(true);
  const [activeTab, setActiveTab] = useState("downloading");

  const handleNavigation = (target: string) => {
    setActiveTab(target);

    if (target === "downloading") {
      setShowDownloading(true);
    } else if (target === "price-service") {
      setShowDownloading(false);
    }
  };
  return (
<div>
    <div>
    <ul className={styles.navigation}>
      <li className={clsx({ [styles.active]: activeTab === "downloading" })}>
        <button onClick={() => handleNavigation("downloading")}>
          Подписки
        </button>
      </li>
      <li className={clsx({ [styles.active]: activeTab === "price-service" })}>
        <button onClick={() => handleNavigation("price-service")}>
          Сохранённые
        </button>
      </li>
    </ul>
    </div>
{showDownloading ? (
  <div>
     {data.subscriptions?.map((sub) => (
          <Subscription key={sub._id} data={sub} />
        ))}
  </div>
) : (<MasonryGallery data={data?.saved} isLoading={undefined} />)}
</div>
  );
};

export default ApplicantMenu;
