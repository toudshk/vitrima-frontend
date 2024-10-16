"use client";
import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import Feedback from "@/components/screens/feedback/Feedback";
import styles from "./page.module.scss"
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import ResetPassword from "@/components/screens/reset-password/ResetPassword";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Забыли пароль?",
}

const Page: NextPageAuth = () => {
 

  return (
    <>
    <section className={styles.container}>
      <div className={styles.leftBlock}>
       
      </div>
      <div className={styles.rightBlock}>
        {/* <div className={styles.logotype}>
          <MainLogoBlack width={595} />
        </div> */}
        <h1 className="text-2xl font-bold mb-6">Забыли пароль?</h1>
        <p className="text-base">Введите адрес электронной почты, который вы использовали при регистрации, и мы вышлем вам инструкции по сбросу пароля.</p>
        <ResetPassword/>
      </div>
    </section>
    </>
  );
};

export default Page;
