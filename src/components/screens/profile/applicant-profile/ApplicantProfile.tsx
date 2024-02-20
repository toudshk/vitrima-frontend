import { FC } from "react";
import { ApplicantProfileProps } from "../Profile.interface";
import Header from "../header";
import styles from './ApplicantProfile.module.scss'
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

import ApplicantMenu from "./ApplicantMenu";
const ApplicantProfile: FC<ApplicantProfileProps> = ({  data, id }) => {
  const { user } = useAuth();
 
  if (!user) {
    redirect("/");
  }


    return (
      <div className={styles.wrapper}>
        <Header data={data} id={id}/>
      <ApplicantMenu data={data}/>
        </div>
    );
  };
  
  export default ApplicantProfile;
  