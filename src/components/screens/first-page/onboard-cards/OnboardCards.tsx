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
    title:
      "Создайте профиль, загрузите свои работы – и вы сможете начать привлекать внимание клиентов и увеличивать свою популярность.",
  },
  {
    src: smallImg2,
    title:
      "Мы создаем максимально короткий путь от вас – профессионального исполнителя – к вашим потенциальным заказчикам.",
  },
  {
    src: bigImg,
    title:
      "Витрима – онлайн-платформа, где вы сможете продвигать свои услуги и расширить свою клиентскую базу. ",
  },
  {
    src: smallImg3,
    title:
      "Витрима – онлайн-платформа, которая максимально упростит процесс подбора подрядчика",
  },
  {
    src: smallImg4,
    title:
      "Мы ценим ваше время, поэтому предлагаем только надежных и проверенных специалистов.",
  },
  {
    src: bigImg2,
    title:
      "Благодаря проработанной системе фильтров и удобной ленте работ вы с легкостью сможете найти исполнителя, который подойдет именно вам.",
  },
];

const GalleryItem: FC<{ data: any; updateActiveImage: any; index: number}> = ({
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
        <div className="gallery-item-info">
          <h1 className={cn("gallery-info-title", {"visible" : onScreen})}>{data.title}</h1>
        </div>
        <Image
          alt=""
          width={3000}
          height={3000}
          className="gallery-item-image"
          src={data.src}
        />
      </div>
      <div></div>
    </div>
  );
};

export default function OnboardCards() {
  const [activeImage, setActiveImage] = useState(1);

  const [text, setText] = useState(
    activeImage <= 3 ? "подрядчикам" : "соискателям"
  );
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (activeImage > 3 && text !== "соискателям") {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setText("соискателям");
        setFadeOut(false);
      }, 500); // Время должно совпадать с transition в CSS

      return () => clearTimeout(timer);
    } else if (activeImage <= 3 && text !== "подрядчикам") {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setText("подрядчикам");
        setFadeOut(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [activeImage]);

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
