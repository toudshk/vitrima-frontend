import { FC, useEffect, useRef, useState } from "react";
import styles from "./ApplicationBlock.module.scss";
import cn from "classnames";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useOnScreen from "@/hooks/useOnScreen";

const SubtitleItem: FC<{
  subtitle: string;
  updateActiveTitle: (index: number) => void;
  index: number;
  isActive: boolean;
}> = ({ subtitle, updateActiveTitle, index, isActive }) => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, 0.5);

  useEffect(() => {
    if (onScreen && !isActive) {
      updateActiveTitle(index);
    }
  }, [onScreen, index, isActive]);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element,
      { y: "0%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0,
        ease: "elastic",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(styles.subtitle, { [styles.isReveal]: onScreen })}
    >
      <p>{index + 1} .</p>
      {subtitle}
    </div>
  );
};

const ApplicationBlock: FC = () => {
  const data = [
    { title: "мы рассматриваем вашу заявку" },
    { title: "ищем дизайнеров и студии на основе ваших данных" },
    { title: "изучаем портфолио и принцип работы" },
    { title: "проверяем их рабочие чертежи и отзывы клиентов" },
    { title: "по возможности проверяем их реализованные объекты" },
    {
      title:
        "связываемся с вами и отправляем вам лучшие варианты со всеми контактными данными",
    },
  ];

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeTitle, setActiveTitle] = useState(-1);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateY: 0,
      },
      {
        translateY: "-300vh",
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

  const handleUpdateActiveTitle = (index: number) => {
    setActiveTitle(index);
  };

  return (
    <div className={styles.container} ref={triggerRef}>
      <h1 className={styles.title}>Как происходит подбор дизайнера</h1>
      <div ref={sectionRef} className={styles.subtitles}>
        {data.map((item, index) => (
          <SubtitleItem
            subtitle={item.title}
            updateActiveTitle={handleUpdateActiveTitle}
            index={index}
            isActive={activeTitle === index}
            key={item.title} // используйте уникальное значение
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationBlock;
