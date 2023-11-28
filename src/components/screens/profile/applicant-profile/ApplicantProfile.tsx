import { FC } from "react";
import { ApplicantProfileProps } from "../Profile.interface";
import Header from "../header";
import styles from './ApplicantProfile.module.scss'
const ApplicantProfile: FC<ApplicantProfileProps> = ({  data, id }) => {
 

    return (
      <div className={styles.wrapper}>
        <Header data={data} id={id}/>
  
        </div>
    );
  };
  
  export default ApplicantProfile;
  