

import { WorkService } from "@/services/work/work.service";
import { FC, useEffect } from "react";
import { IWorks } from "../../Profile.interface";
import styles from "./ProfileWorks.module.scss";
import Image from "next/image";
const ProfileWorks: FC<IWorks> = async (work, {index}) => {

  console.log(index)
 
  return (
    <div className={styles.wrapper}>
      {index % 2 ===0 ? (
        <>
          <div className={styles.imageBlock}>
            <Image
              src={work.images[0]}
              width={860}
              height={348}
              alt={"фотография"}
            />
          </div>
          <div className={styles.textBlock}>
            <h1>{work.title}</h1>
            <p>{work.description}</p>
          </div>
        </>
      ) : (
        <>
          <div className={styles.textBlock}>
            <h1>{work.title}</h1>
            <p>{work.description}</p>
          </div>
          <div className={styles.imageBlock}>
            <Image
              src={work.images[0]}
              width={860}
              height={348}
              alt={"фотография"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileWorks;
