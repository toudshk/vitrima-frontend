"use client";
import React, { FC, useEffect, useState } from "react";

import styles from "./FirstPage.module.scss";

import { MainLogo } from "@/components/common/icons/MainLogo";
import OnboardCards from "../onboard-cards/OnboardCards";
import RegisterBanner from "../register-banner/RegisterBanner";
import Footer from "@/components/layout/footer/Footer";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { IUserInitialState } from "@/store/user/user.interface";




const FirstPage: FC = () => {

  const {user} = useAuth()

  return (
    <div>
      {user ? (
        <div className={styles.block}>
          <div className={styles.links}>
            
            <Link href="/interior">Интерьер</Link>
            <Link href="/architecture">Архитектура</Link>
          </div>
          <p>
            Выберите тип ленты, который вам интересен, чтобы смотреть работы
            соответствующие вашим пожеланиям
          </p>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.iconContent}>
            <MainLogo width={590} />
            <h4>Сервис возможностей </h4>
          </div>
          <div className={styles.detailed}>Подробнее</div>
          <OnboardCards />
          <RegisterBanner />
          <Footer />
        </div>
      )}
    </div>
  );
};



export default FirstPage;
