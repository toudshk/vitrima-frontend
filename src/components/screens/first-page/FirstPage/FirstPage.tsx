// @ts-nocheck

"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./FirstPage.module.scss";
import icon from "@/app/assets/images/MainLogoBlack.svg";
import clsx from "clsx";
import Footer from "@/components/layout/footer/Footer";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useGallery } from "../../main-page/UseGallery";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import TimeUpload from "@/components/ui/masonry/timeUpload/TimeUpload";

import ContestModalWindow from "./contest-modal-window/ContestModalWindow";
import { useUser } from "../../profile/useUser";

import baseImage from "@/app/assets/images/base-avatar.jpg";
import ApplicationBlock from "../application-block/ApplicationBlock";
import OnboardCards from "../onboard-cards/OnboardCards";
import LocomotiveScroll from "locomotive-scroll";

import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { useRouter } from 'next/router'
const FirstPage: FC = () => {
  const { ref: refView, inView } = useInView();
  const { user } = useAuth();
  const { data: userData } = useUser(user?._id);
  const breakpointColumnsObj = {
    default: 8,
    900: 4,
  };
  const pathname = usePathname()

  
  console.log(pathname)
  useEffect(() => {
    let locomotiveScroll: LocomotiveScroll | null = null;

    if (pathname === '/') {
        const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement;

        if (scrollContainer) {
            locomotiveScroll = new LocomotiveScroll({
                el: scrollContainer,
                smooth: true
            });
        }
    }

    return () => {
        if (locomotiveScroll) {
            locomotiveScroll.destroy();
        }
    };
}, [pathname]);




  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const [open, setOpen] = useState(false);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGallery("interior", {});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <div data-scroll-container>
      <div className={styles.container}>
        <div>
          <div className={styles.mainBlock}>
            <div className={styles.leftBlock}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.logoBlock}
              >
                <Image src={icon} alt={""} width={650} height={350} />
                <h1 className={styles.title}>
                  Индивидуальный подбор дизайнеров
                </h1>
              </motion.div>
              <div className={styles.buttons}>
                <div
                  className={styles.middleButtons}
                 
                >
                  <Link href={"/project"}>Заказать подбор специалиста</Link>
                  <Link href={"/select-feed"}>Перейти к просмотру ленты</Link>
                </div>
                <div className={styles.bottomButtons}>
                  {!user ? (
                    <>
                      <Link href={"/login"}>Войти в аккаунт</Link>
                      <div className={styles.registerBlock}>
                        <p>Еще не с нами?&nbsp;</p>
                        <Link href={"/signup"} className={styles.lastLink}>
                          Зарегиструйся!
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className={styles.blockForAuth}>
                      <div className={styles.userData}>
                        <div className={styles.avatarWrapper}>
                          <Image
                            className={styles.image}
                            src={userData?.image ? userData.image : baseImage}
                            width={100}
                            height={100}
                            alt=""
                          />{" "}
                        </div>
                        <div className={styles.textBlock}>
                          <p className={styles.nickName}>
                            {userData?.nickname}
                          </p>
                          <p className={styles.email}>{userData?.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <button
                  onClick={(e) => {
                    setOpen(true);
                  }}
                  className={styles.contestButton}
                >
                  Участие в конкурсе
                </button> */}

              <ContestModalWindow open={open} setOpen={setOpen} />
            </div>
            <div className={styles.rightBlock}>
              <div className={styles.gallery}>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className={styles.masonryGallery}
                >
                  {objects?.map((item, index) => (
                    <div
                      key={item._id}
                      className="relative"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            className={styles.hover}
                            style={{
                              left: hoverPosition.x,
                              top: hoverPosition.y,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Здесь ваше содержимое */}
                            <p className={styles.hoverTitle}>
                              Работа {item.contractorId.nickname}
                            </p>
                            <p className={styles.hoverTimeUpload}>
                              <TimeUpload
                                date={item.createdAt}
                                withIcon={false}
                              />
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Image
                        src={item.images[0]}
                        width={500}
                        height={10}
                        alt={""}
                        className="transition-all mb-[1vw] rounded-lg opacity-0 duration-300"
                        onLoadingComplete={(image) =>
                          image.classList.remove("opacity-0")
                        }
                      />
                    </div>
                  ))}
                  {data?.pages[data.pages.length - 1]?.data.length <= 5 ? (
                    <h1 className="text-center text-[3vw] my-16 text-gray-450 select-none">
                      На этом всё
                    </h1>
                  ) : (
                    <button ref={refView} className="mt-1" />
                  )}
                </Masonry>
              </div>
            </div>
          </div>
        </div>

       
        <div>
          <ApplicationBlock />
        </div>
        <div id="onboardCardsSection" >
          <OnboardCards />
        </div>
        {/* <RegisterBanner /> */}
        <Footer />
      </div>
    </div>
  );
};

export default FirstPage;
