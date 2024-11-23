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

import useOnScreen from "@/hooks/useOnScreen";

import "./style.scss";
import Image from "next/image";

const images = [
  {
    src: smallImg,

    subtitle:
      "Мы подбираем дизайнера на основе ваших данных и пожеланий. Сначала мы отбираем лучших претендентов, после чего проверяем им альбомы с проектами, рабочие чертежи и реализованные проекты, после чего направляем вам лучших кандидатов. Вам не придется самим тратить время на подбор и переживать на счет того, что дизайнер может оказаться не компетентным.",
  },
  {
    src: smallImg2,
  
    subtitle:
      "Мы подбираем строителей на основе ваших данных и пожеланий. В первую очередь мы проверяем их уже реализованные проекты на предмет брака, внимательно осматриваем сложные моменты и как они были выполнены и соотносим цену и качество. Вам не придется переживать за то, что строительная бригада выполнит свою работу не качественно или завысит цену. Мы поможем вам подобрать хороших строителей по справедливой цене.",
  },
  {
    src: bigImg,
  
    subtitle:
      "Мы проверяем рабочие чертежи, которые выполнил для вас дизайнер на предмет неточностей или недостатка рабочей информации для реализации проекта. Это нужно, чтобы в момент ремонта у строителей не возникали вопросы по реализации. Также это нужно для того, чтобы ваш ремонт получился таким же, как и на визуализациях.",
  },
  {
    src: smallImg3,
   
    subtitle:
      "Эта услуга пока находится в разработке. просим прощения за доставленные неудобства.",
  },
  {
    src: smallImg4,
   
    subtitle:
      "Зачастую дизайнеры предлагают вам свои варианты, где вы можете заказать мебель на заказ для вашего проекта, но не всегда эти фабрики делают хорошо. Дизайнеры могут их рекомендовать потому, что получат с этого процент, а мы предлагаем вам подбор фабрик для заказа всей вашей мебели на заказ для вашего проекта. Мы подберем качественные фабрики и проверим их качество самостоятельно, чтобы ваша мебель прослужила вам еще долгие годы.",
  },
  // {
  //   src: bigImg2,
  //   title:
  //     "Благодаря проработанной системе фильтров и удобной ленте работ вы с легкостью сможете найти исполнителя, который подойдет именно вам.",
  // },
];

const GalleryItem: FC<{ data: any; updateActiveImage: any; index: number }> = ({
  data,
  updateActiveImage,
  index,
}) => {
  const ref = useRef(null);

  const onScreen = useOnScreen(ref, 0.5);

  useEffect(() => {
    if (onScreen) {
      updateActiveImage(index);
    }
  }, [onScreen, index]);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element,
      { x: "10%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );

    return () => {
      // Очистка триггеров при размонтировании
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const itemClass = clsx("gallery-item", {
    "special-style": index === 2 || index === 5, // Добавляем классы для 3-й и 6-й фотографии
  });

  return (
    <div className={cn("gallery-item-wrapper", { "is-reveal": onScreen })}>
      <div></div>
      <div className={itemClass} ref={ref}>
        <Image
          alt=""
          width={3000}
          height={3000}
          className="gallery-item-image"
          src={data.src}
        />
        <div className="gallery-item-info">
          <h1 className={cn("gallery-info-subtitle", { visible: onScreen })}>
            {data.subtitle}
          </h1>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default function OnboardCards() {
  const [activeImage, setActiveImage] = useState(1);
  const [text, setText] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  const texts = [
    "Подбор дизайнера",
    "Подбор строителей",
    "Проверка рабочих чертежей",
    "Ведение стройки онлайн",
    "Создание комплектации мебели на заказ",
  ];

  useEffect(() => {
    if (text !== texts[activeImage - 1]) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setText(texts[activeImage - 1]);
        setFadeOut(false);
      }, 500); // Время должно совпадать с transition в CSS

      return () => clearTimeout(timer);
    }
  }, [activeImage, texts, text]);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-500vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  const handleUpdateActiveImage = (index: number) => {
    setActiveImage(index + 1);
  };
  return (
    <section
      data-scroll-section
      className="section-wrapper gallery-wrap"
      ref={triggerRef}
    >
      <div className="gallery-counter">
        <div>
          <span>{activeImage}</span>
          <span className="divider" />
          <span>{images.length}</span>
        </div>
        <p className={clsx({ "fade-out": fadeOut })}>{text}</p>
      </div>
      <div className="gallery" ref={sectionRef}>
        {images.map((data, index) => (
          <GalleryItem
            key={index}
            index={index}
            data={data}
            updateActiveImage={handleUpdateActiveImage}
          />
        ))}
      </div>
    </section>
  );
}
