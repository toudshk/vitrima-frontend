import { FC } from "react";
import { ApplicantProfileProps } from "../Profile.interface";
import Header from "../header";
import styles from './ApplicantProfile.module.scss'

import ApplicantMenu from "./ApplicantMenu";
const ApplicantProfile: FC<ApplicantProfileProps> = ({  data, id }) => {

    return (
      <div className={styles.wrapper}>
        <Header data={data} id={id}/>
      <ApplicantMenu data={data}/>
        </div>
    );
  };
  
  export default ApplicantProfile;
  