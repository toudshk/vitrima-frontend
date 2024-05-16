
import icon from "@/app/assets/images/MainLogo.svg";
import mobileIcon from "@/app/assets/images/WhiteIconLogo.svg"
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import styles from './icons.module.scss'


export const MainLogo: FC<{ height: number }> = ({ height }) => {
  return (
    <div className={styles.logoWrapper}>
      <Image
        height={height}
        src={icon}
        alt="Vitrima"
        draggable={false}
        className={styles.desktopIcon}
      />
      <Image
        height={height}
        src={mobileIcon}
        alt="Vitrima"
        draggable={false}
        className={styles.mobileIcon}
      />
    </div>
  );
};

export default MainLogo;