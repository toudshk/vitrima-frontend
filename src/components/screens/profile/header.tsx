import React, { FC } from "react";
import Link from "next/link";
import MainButton from "@/components/ui/Button/MainButton";
import styles from './Profile.module.scss'
import { IData } from "./Profile.interface";
import img from '@/app/assets/images/StandartAvatar.svg'
import Image from "next/image";
const Header:  FC<IData> = ({data}) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftBlock}>
        <Image width={72} height={72} src={img} alt={"аватарка"} />
        <p>{data.nickname}</p>
      </div>
      <div className={styles.rightBlock}>
        <Link className={styles.firstLink} href={"/add-work"}>
          Добавить работу
        </Link>
        <Link className={styles.secondLink} href={"/"}>
          Редактировать профиль
        </Link>
      </div>
    </div>
  );
};

export default Header;
