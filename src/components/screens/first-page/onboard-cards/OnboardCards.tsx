"use client";
import bigImg from "../../../common/images/ui/mainPage/bigImage.jpg";
import smallImg from "../../../common/images/ui/mainPage/smallImage1.jpg";
import smallImg2 from "../../../common/images/ui/mainPage/smallImage2.jpg";
import bigImg2 from "../../../common/images/ui/mainPage/bigImage2.jpg";
import clsx from "clsx";
import smallImg3 from "../../../common/images/ui/mainPage/smallImage3.jpg";
import smallImg4 from "../../../common/images/ui/mainPage/smallImage4.jpg";

import React, { FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import cn from "classnames";
import { useGSAP } from "@gsap/react";
import useOnScreen from "@/hooks/useOnScreen";

import styles from "./OnboardCards.module.scss";
import Image from "next/image";


const images = [
  {
    src: smallImg,
    subtitle:
      "Подбор дизайнера происходит на основе ваших предпочтений. Для экономии вашего времени, всю работу от отбора претендентов до проверки рабочих чертежей мы берём на себя, после чего,вы делаете выбор из лучших кандидатов, предоставленными нами.",
    title: "Подбор дизайнера",
  },
  {
    src: smallImg2,
    subtitle:
      "Выбор строителей производится основываясь на ваших данных. Мы проверяем кандидатов и их реализованные проекты, после чего соотносим цену и качество услуги каждого строителя. Наш сервис подберёт для вас лучших специалистов.",
    title: "Подбор строителей",
  },
  {
    src: smallImg3,
    subtitle:
      "Рабочие чертежи проходят проверку на соответствие требованиям проекта и оценку полноты рабочей информации. Это способствует более точной реализации проекта.",
    title: "Проверка рабочих чертежей",
  },
  {
    src: smallImg4,
    subtitle:
      "Наш сервис предоставляет услугу по подбору производителей мебели для ваших проектов. Фабрики проходят проверку на качество материалов и продуктов, из-за чего срок службы мебели остаётся высоким.",
    title: "Создание комплектации мебели на заказ",
  },
];

const GalleryItem: FC<{ data: any; index: number }> = ({
  data,

  index,
}) => {
  const ref = useRef(null);
  return (
    <div ref={ref} className={styles.item} id={`custom-card-${index}`}>
      <div className={styles.textBlock}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.text}>{data.subtitle}</p>
        <span>{index + 1}</span>
      </div>
      <Image
        alt=""
        width={600}
        height={600}
        className={styles.image}
        src={data.src}
      />
    </div>
  );
};



export default function OnboardCards() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#gallery",
        pin: true,
        scrub: true,
        start: "top 0%",
        end: '2000 top',
        // markers: true
      },
    });
  
    const offsetStep = 50; // Расстояние, на которое опускаются карточки
  
    images.forEach((_, index) => {
      if (index === 0) return; // Первая карточка остается на месте
  
      tl.fromTo(
        `#custom-card-${index}`,
        {
          yPercent: 135, // Начальная позиция сверху
          zIndex: 10 + index, // Регулировка перекрытия
        },
        {
          yPercent: index * offsetStep / 5, // Смещение вниз, создавая "лестницу"
          ease: "power2.out",
         
        },
      
      );
    });
  });
  
  return (
    <section data-scroll-section className={styles.container} >
      <div className={styles.gallery} id="gallery">
        {images.map((data, index) => (
          <GalleryItem key={index} index={index} data={data} />
        ))}
      </div>
    </section>
  );
}
