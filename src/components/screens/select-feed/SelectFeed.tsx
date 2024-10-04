"use client";
import React, { FC, useEffect } from "react";
import styles from "./SelectFeed.module.scss";
import Link from "next/link";
import { useGallery } from "../main-page/UseGallery";
import { useInView } from "react-intersection-observer";

import Image from "next/image";
import Masonry from "react-masonry-css";
const SelectFeed: FC = () => {
  const { data: interiorData, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGallery("interior", {});
    const { data: architectureData, fetchNextPage: architectureFetchNextPage } =
    useGallery("architecture", {});
  const { ref: refView, inView } = useInView();

  useEffect(() => {
    const loadInitialPage = async () => {
      if (inView && architectureData?.pages && architectureData.pages.length > 0) {
        const minPage = architectureData.pages[architectureData.pages.length - 1]?.pageParam + 1 || 1;
        await fetchNextPage({
          pageParam: minPage,
        });
      }
    };

    loadInitialPage();
  }, [inView, architectureData, architectureFetchNextPage]);



  useEffect(() => {
    const loadInitialPage = async () => {
      if (inView && interiorData?.pages && interiorData.pages.length > 0) {
        const minPage = interiorData.pages[interiorData.pages.length - 1]?.pageParam + 1 || 1;
        await fetchNextPage({
          pageParam: minPage,
        });
      }
    };

    loadInitialPage();
  }, [inView, interiorData, fetchNextPage]);

  const objects = interiorData?.pages.flatMap((page) => page.data);
  
  const archObjects = architectureData?.pages.flatMap((page) => page.data);
  return (
    <div className={styles.block}>
      <div className={styles.links}>
        <div className={styles.leftBlock}>
          <div className={styles.gallery}>
            <Masonry breakpointCols={5} className={styles.masonryGallery}>
              {objects?.map((item, index) => (
                <Image
                  key={item._id}
                  src={item.images[0]}
                  width={500}
                  height={10}
                  alt={""}
                  className="transition-all mb-[0.7vw]  rounded-lg"
                />
              ))}
              {interiorData?.pages[interiorData.pages.length - 1]?.data.length <= 5 ? (
                <h1 className="text-center text-[3vw]  text-gray-450 select-none">
                 
                </h1>
              ) : (
                <button ref={refView} className="mt-1" />
              )}
            </Masonry>
          </div>
          <Link href="/interior" className={styles.title} >Интерьер</Link>
        </div>
        <div className={styles.rightBlock}>
        <div className={styles.gallery}>
            <Masonry breakpointCols={5} className={styles.masonryGallery}>
              {archObjects?.map((item, index) => (
                <Image
                  key={item._id}
                  src={item.images[0]}
                  width={500}
                  height={10}
                  alt={""}
                  className="transition-all mb-[0.7vw]  rounded-lg"
                />
              ))}
              {architectureData?.pages[architectureData.pages.length - 1]?.data.length <= 5 ? (
                <h1 className="text-center text-[3vw]  text-gray-450 select-none">
                 
                </h1>
              ) : (
                <button ref={refView} className="mt-1" />
              )}
            </Masonry>
          </div>
          <Link href="/architecture"  className={styles.title} >Архитектура</Link>
        </div>
      </div>
      <p>
        Выберите тип ленты, который вам интересен, чтобы смотреть работы,
        соответствующие вашим пожеланиям
      </p>
    </div>
  );
};

export default SelectFeed;
