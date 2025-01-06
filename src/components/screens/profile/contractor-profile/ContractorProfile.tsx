"use client";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./ContractorProfile.module.scss";
import { ContractorProfileProps } from "../Profile.interface";
import Header from "../header";
import ProfileWorks from "./profile-works/ProfileWorks";
import ModalSubscription from "./ModalSubscription";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import clsx from "clsx";
const ContractorProfile: FC<ContractorProfileProps> = ({
  userData,
  id,
  isLoading,
}) => {
  const [open, setOpen] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
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
      <Header data={userData} id={id} setOpen={setOpen} isLoading={isLoading} />
      <ModalSubscription setOpen={setOpen} open={open} />
      <div className={styles.blockTitle}>
        {isLoading ? (
          <SkeletonLoader width={250} height={40} />
        ) : (
          <div className="block">
            <div
              className={styles.leftBlock}
              onClick={() => setOpenDescription(!openDescription)}
            >
              Информация о подрядчике
             
                {openDescription ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              
            </div>
            <div
              className={clsx(styles.description, {
                [styles.open]: openDescription,
              })}
              onClick={() => setOpenDescription(!openDescription)}
            >
              {userData.description}
            </div>
          </div>
        )}
        <div className={styles.rightBlock}>
          <div className={styles.subscribers}>
            <p>Подписчики</p>
            {isLoading ? (
              <SkeletonLoader width={10} height={10} />
            ) : (
              <div>{userData.subscribers?.length}</div>
            )}
          </div>
          {/* <div className={styles.inn}>
                <p>ИНН</p>
                <div>{userData.inn}</div>
              </div> */}
        </div>
      </div>
      <div className={styles.blockWorks}>
        <ProfileWorks id={id} userData={userData}/>
      </div>
    </div>
  );
};

export default ContractorProfile;
