"use client"
import { FC } from "react";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import styles from "./ProfileWorks.module.scss";
import Image from "next/image";
import { useWork } from "./useWork";

import SecondWorks from "../second-works/SecondWorks";


const ProfileWorks: FC<{id: string}> = ({id}) => {
  const { data, isLoading} = useWork();

  if(isLoading ) return <SkeletonLoader />

  if(!data) return <div>Работы не найдены</div>
  const firstTwoWorks = data.slice(0, 2);

  return (
    <div className={styles.wrapper}>

      {firstTwoWorks.map((work: any, index: number) => {
        return (
          <div className={styles.itemBlock} key={index}>
            {index % 2 === 0 ? (
              <>
                <div className={styles.imageBlock}>
                  <Image
                    src={work.images[0]}
                    width={860}
                    height={348}
                    alt={"фотография"}
                  />
                </div>
                <div className={styles.textBlock}>
                  <h1>{work.title}</h1>
                  <p>{work.description}</p>
                </div>
              </>
            ) : (
              <>
                <div className={styles.textBlock}>
                  <h1>{work.title}</h1>
                  <p>{work.description}</p>
                </div>
                <div className={styles.imageBlock}>
                  <Image
                    src={work.images[0]}
                    width={860}
                    height={348}
                    alt={"фотография"}
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
      

      <div>
        <SecondWorks />
      </div>
    </div>
  );
};

export default ProfileWorks;
