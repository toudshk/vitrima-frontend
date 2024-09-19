import Slider from "react-slick";
import Image from "next/image";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import styles from "./ImageSlider.module.scss";
import React, { FC } from "react";
import { IWork } from "@/components/shared/types/work.types";

const WorkSlider: FC<{ workData: IWork; isLoading: boolean }> = ({
  workData,
  isLoading,
}) => {
  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    fade: true,  
  };

  return (
    <div className={styles.selectedWork}>
      {isLoading ? (
        <SkeletonLoader
          borderRadius={12}
          height={700}
          width={"100vw"}
          className="max-w-[1172px]"
        />
      ) : (
        <Slider {...settings} className={styles.slider}>
          {workData?.images.map((image: string, index: number) => (
            <div key={index} className={styles.slide}>
              <Image
                className={styles.image}
                width={2500}
                height={2500}
                src={image}
                alt={`Work image ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default WorkSlider;
