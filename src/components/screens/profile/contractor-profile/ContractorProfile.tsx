"use client"
import { FC, useEffect, useRef, useState } from "react";
import styles from "./ContractorProfile.module.scss";
import { ContractorProfileProps } from "../Profile.interface";
import Header from "../header";
import { useWorks } from "../useWorks";
import ProfileWorks from "./profile-works/ProfileWorks";
import { Dialog, DialogContent, DialogProps } from "@mui/material";
import ModalSubscription from "./ModalSubscription";

const ContractorProfile: FC<ContractorProfileProps> = ({ userData, id }) => {


  const [open, setOpen] = useState(false);

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  return (
    <div className={styles.wrapper}>
      <Header data={userData} id={id}
        setOpen={setOpen} />
<ModalSubscription setOpen={setOpen} open={open}/>
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
          <ProfileWorks id={id} />
        </div>

    </div>
  );
};

export default ContractorProfile;
