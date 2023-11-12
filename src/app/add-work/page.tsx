"use client";
import React from "react";
import styles from "./page.module.scss";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
const page: NextPageAuth = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();
  return (
    <>
      {user?.isContractor ? (
        <div className={styles.wrapper}>
          <div className={styles.leftBlock}>photo</div>
          <div className={styles.rightBlock}>other info</div>
          
        </div>



      ) : (
        <div>у вас нет доступа</div>
      )}
    </>
  );
};
page.isOnlyContractor = true;

export default page;
