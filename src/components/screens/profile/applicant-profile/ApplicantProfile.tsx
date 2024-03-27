import { FC } from "react";
import { ApplicantProfileProps } from "../Profile.interface";
import Header from "../header";
import styles from "./ApplicantProfile.module.scss";

import ApplicantMenu from "./ApplicantMenu";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
const ApplicantProfile: FC<ApplicantProfileProps> = ({
  data,
  id,
  isLoading,
}) => {
  return (
   
        <div className={styles.wrapper}>
          <Header data={data} id={id} isLoading={isLoading}/>
          <ApplicantMenu data={data} isLoading={isLoading} />
        </div>
    
  );
};

export default ApplicantProfile;
