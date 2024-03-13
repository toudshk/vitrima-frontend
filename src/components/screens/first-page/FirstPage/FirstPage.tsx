"use client";
import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./FirstPage.module.scss";
import icon from "@/app/assets/images/MainLogoBlack.svg";
import { MainLogo } from "@/components/common/icons/MainLogo";
import OnboardCards from "../onboard-cards/OnboardCards";
import RegisterBanner from "../register-banner/RegisterBanner";
import Footer from "@/components/layout/footer/Footer";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Gallery from "../../main-page/Gallery";
import { useGallery } from "../../main-page/UseGallery";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";

const FirstPage: FC = () => {
  const { ref, inView } = useInView();
  const { user } = useAuth();
  const scrollToOnboardCards = () => {
    const onboardCardsSection = document.getElementById("onboardCardsSection");
    if (onboardCardsSection) {
      onboardCardsSection.scrollIntoView({
        behavior: "smooth",
        block: "start", // Align to the top of the target element
        inline: "start",
      });
    }
  };

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGallery("interior", {});

  useEffect(() => {
    const loadInitialPage = async () => {
      if (inView && data?.pages && data.pages.length > 0) {
        const minPage = data.pages[data.pages.length - 1]?.pageParam + 1 || 1;
        await fetchNextPage({
          pageParam: minPage,
        });
      }
    };

    loadInitialPage();
  }, [inView, data, fetchNextPage]);

  const objects = data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.iconContent}>
          <div className={styles.imageContainer}>
            <Image src={icon} width={1200} draggable={false} alt="Vitrima" />
          </div>
          <h4>Сервис возможностей </h4>
          <Link href={"/select-feed"}>Выбор ленты</Link>
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
    </div>

    // <div>
    //   <div className={styles.container}>
    //     <div className={styles.iconContent}>
    //       <div className={styles.imageContainer}>
    //         <Image src={icon} width={1200} draggable={false} alt="Vitrima" />
    //       </div>
    //       {/* <h4>Сервис возможностей </h4> */}
    //       <div className={styles.containerGallery}>
    //       <div className={styles.gallery} style={{ pointerEvents: "none" }}>
    //         <Masonry breakpointCols={6} className="flex gap-3 mx-[1vw] " >
    //           {objects?.map((item) => (
    //             <Image
    //      className="pb-3"
    //               key={item._id}
    //               src={item.images[0]}
    //               alt={""}
    //               width={300}
    //               height={100}
    //             />
    //           ))}
    //         </Masonry>
    //         {data?.pages[data.pages.length - 1]?.data.length <= 5 ? (
    //           <h1 className="text-center text-[3vw] my-16 text-gray-450 select-none">
    //             На этом всё
    //           </h1>
    //         ) : (
    //           <button ref={ref} className="mt-1" />
    //         )}
    //       </div>
    //       </div>
    //       <Link href={"/select-feed"}>Выбор ленты</Link>
    //     </div>
    //     <div className={styles.detailed} onClick={scrollToOnboardCards}>
    //       Подробнее
    //     </div>
    //     <div id="onboardCardsSection">
    //       <OnboardCards />
    //     </div>
    //     <RegisterBanner />
    //     <Footer />
    //   </div>
    // </div>
  );
};

export default FirstPage;
