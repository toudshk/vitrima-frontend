"use client";
import { FC, useState } from "react";
import clsx from "clsx";
import styles from "./ApplicantProfile.module.scss";
import Subscription from "./Subscription";
import { IApplicant } from "@/components/shared/types/user.types";
import MasonryGallery from "@/components/ui/masonry/MasonryGallery";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useProjects } from "./useProject";

interface IDataApplicant {
  data: any;
  isLoading: boolean;
}

const ApplicantMenu: FC<IDataApplicant> = ({ data, isLoading }) => {
  
  const [showDownloading, setShowDownloading] = useState(true);
  const [activeTab, setActiveTab] = useState("downloading");
  const { data: projectsData } = useProjects(data?._id);
  const handleNavigation = (target: string) => {
    setActiveTab(target);

    if (target === "subscribes") {
      setActiveTab("subscribes");
    } else if (target === "saved") {
      setActiveTab("saved");
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div>
          <div>
            <ul className={styles.navigation}>
              <li
                className={clsx({
                  [styles.active]: activeTab === "subscribes",
                })}
              >
                <button onClick={() => handleNavigation("subscribes")}>
                  Подписки
                </button>
              </li>
              <li className={clsx({ [styles.active]: activeTab === "saved" })}>
                <button onClick={() => handleNavigation("saved")}>
                  Сохранённые
                </button>
              </li>
             
            </ul>
          </div>
          {activeTab == "downloading" && (
            <div>
              {data.subscriptions?.map((sub: any) => (
                <Subscription key={sub._id} data={sub} />
              ))}
            </div>
          )}
          {activeTab == "saved" && (
            <MasonryGallery data={data?.saved} isLoading={false} />
          )}
          
        </div>
      )}
    </>
  );
};

export default ApplicantMenu;
