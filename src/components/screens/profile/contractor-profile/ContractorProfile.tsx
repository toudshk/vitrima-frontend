
import { FC } from "react";
import styles from "./ContractorProfile.module.scss";
import { ContractorProfileProps } from "../Profile.interface";
import Header from "../header";
import { useWorks } from "../useWorks";
import ProfileWorks from "./profile-works/ProfileWorks";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

const ContractorProfile: FC<ContractorProfileProps> = ({ userData, id }) => {
  const { user } = useAuth();

  if (!user) {
    redirect("/");
  }

  


  return (
    <div className={styles.wrapper}>
      <Header data={userData} id={id} />

      <div className={styles.blockTitle}>
        <div className={styles.leftBlock}>{userData.email}</div>
        <div className={styles.rightBlock}>
          <div className={styles.subscribers}>
            <p>Подписчики</p> 
            <div>{userData.subscribers?.length}</div>
          </div>

          {/* <div className={styles.inn}>
            <p>ИНН</p>
            <div>{userData.inn}</div>
          </div> */}
        </div>
      </div>
      <div className={styles.blockWorks}>
      <ProfileWorks  id={id}/>
      </div>
     
    </div>
  );
};

export default ContractorProfile;
