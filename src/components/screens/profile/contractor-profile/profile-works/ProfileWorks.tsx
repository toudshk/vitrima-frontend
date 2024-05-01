"use client";
import { FC } from "react";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import styles from "./ProfileWorks.module.scss";
import Image from "next/image";
import { useWork } from "./useWork";

import SecondWorks from "../second-works/SecondWorks";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const ProfileWorks: FC<{ id: string }> = ({ id }) => {
  const { user } = useAuth();
  const { data, isLoading } = useWork();
  let isOwner = id === user?._id;

  if (isLoading)
    return (
      <SkeletonLoader
        className={styles.skeletonLoader}
        containerClassName={styles.containerLoader}
        count={2}
      />
    );

  if (!data) return <div>Работы не найдены</div>;
  const firstTwoWorks = data.slice(0, 2);

  return (
    <div className={styles.wrapper}>
      <div className={styles.works}>
        {firstTwoWorks.length > 0 ? (
          firstTwoWorks.map((work: any, index: number) => {
            return (
              <div className={styles.itemBlock} key={index}>
                {index % 2 === 0 ? (
                  <>
                    <div className={styles.imageLeftBlock}>
                      <div className={styles.textLeftBlock}>
                        <h1>{work.title}</h1>
                        <p>{work.description}</p>
                      </div>
                      <Image
                      className="rounded-xl"
                        src={work.images[0]}
                        width={860}
                        height={348}
                        alt={"фотография"}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.imageRightBlock}>
                      <Image
                       className="rounded-xl"
                        src={work.images[0]}
                        width={860}
                        height={348}
                        alt={"фотография"}
                      />
                      <div className={styles.textRightBlock}>
                        <h1>{work.title}</h1>
                        <p>{work.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : isOwner ? (
          <div className={styles.emptyWorks}>
            <div className={styles.firstBlock}>
              <h1>Загрузите свою первую работу</h1>
              <p>
                Покажите свою лучшую работу. Получайте отзывы и
                станьте частью растущего сообщества.
              </p>
              <Link href={"/add-work"} className={styles.addWorkButton}>Добавить работу</Link>
            </div>
            <div className={styles.secondBlock}></div>
          </div>
        ) : (
          <div> notisowner</div>
        )}
      </div>

      <div>
        <SecondWorks />
      </div>
    </div>
  );
};

export default ProfileWorks;
