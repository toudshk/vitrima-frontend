"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./FirstPage.module.scss";
import icon from "@/app/assets/images/MainLogoBlack.svg";
import OnboardCards from "../onboard-cards/OnboardCards";
import clsx from "clsx";
import Footer from "@/components/layout/footer/Footer";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useGallery } from "../../main-page/UseGallery";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import TimeUpload from "@/components/ui/masonry/timeUpload/TimeUpload";

import { Bounce, toast } from "react-toastify";
import ContestModalWindow from "./contest-modal-window/ContestModalWindow";

const FirstPage: FC = () => {
  const { ref, inView } = useInView();
  const { user } = useAuth();
  const breakpointColumnsObj = {
    default: 4,
    900: 3,
  };
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

  const notificationShownRef = useRef(false);

  useEffect(() => {
    // Проверяем, было ли уведомление уже показано
    if (!notificationShownRef.current) {
      // Если уведомление еще не было показано, то показываем его
      toast(
        "Дорогие посетители ВИТРИМЫ, наша платформа сейчас находится в тестовом режиме, поэтому, если вы наткнётесь на функции, которые работают некорректно, то напишите нам на почту, с уважением команда ВИТРИМЫ.",
        {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
          transition: Bounce,
          bodyClassName: "",
        }
      );
      // Помечаем, что уведомление было показано
      notificationShownRef.current = true;
    }
  }, []);

  const objects = data?.pages.flatMap((page) => page.data);
  return (
    <div>
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
                <Image src={icon} alt={""} width={500} height={300} />
                <h1 className={styles.title}>Все дороги ведут к нам</h1>
              </motion.div>
              <div className={styles.links}>
                <div className={styles.topLinks}>
                  <Link href={"/select-feed"} className={styles.link}>
                    Просмотр ленты
                  </Link>
                  {!user && (
                    <>
                      <Link href={"/signup"} className={styles.secondLink}>
                        Регистрация
                      </Link>
                      <Link href={"/login"} className={styles.lastLink}>
                        Авторизация
                      </Link>
                    </>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    setOpen(true);
                  }}
                  className={styles.contestButton}
                >
                  Участие в конкурсе
                </button>
              </div>
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
                    <button ref={ref} className="mt-1" />
                  )}
                </Masonry>
              </div>
            </div>
          </div>
        </div>

        <div id="onboardCardsSection">
          <OnboardCards />
        </div>
        {/* <RegisterBanner /> */}
        <Footer />
      </div>
    </div>
  );
};

export default FirstPage;
