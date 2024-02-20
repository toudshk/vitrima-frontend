"use client";
import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./FirstPage.module.scss";
import icon from "@/app/assets/images/MainLogo.svg";
import { MainLogo } from "@/components/common/icons/MainLogo";
import OnboardCards from "../onboard-cards/OnboardCards";
import RegisterBanner from "../register-banner/RegisterBanner";
import Footer from "@/components/layout/footer/Footer";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";


const FirstPage: FC = () => {
  const { user } = useAuth();
  const scrollToOnboardCards = () => {
    const onboardCardsSection = document.getElementById("onboardCardsSection");
    if (onboardCardsSection) {
      onboardCardsSection.scrollIntoView({ behavior: "smooth",block: "start", // Align to the top of the target element
      inline: "start", });
    }
  };
  return (
    <div>
      {user ? (
        <div className={styles.block}>
          <div className={styles.links}>
            <Link href="/interior">Интерьер</Link>
            <Link href="/architecture">Архитектура</Link>
          </div>
          <p>
          Выберите тип ленты, который вам интересен, чтобы смотреть работы, соответствующие вашим пожеланиям
          </p>
        </div>
      ) : (
        <div className={styles.container}>
        <div className={styles.iconContent}>
          <Image src={icon} width={590} draggable={false} alt="Vitrima" />
          <h4>Сервис возможностей </h4>
        </div>
        <div className={styles.detailed} onClick={scrollToOnboardCards}>
          Подробнее
        </div>
        <div id="onboardCardsSection">
          <OnboardCards />
        </div>
        <RegisterBanner />
        <Footer />
      </div>
      )}
    </div>
  );
};

export default FirstPage;
