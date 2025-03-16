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
          start: "top top",
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
    { title: "ищем специалистов на основе ваших данных" },
    { title: "изучаем портфолио и реализованные работы" },
    { title: "проверяем их рабочую документацию и отзывы клиентов" },
    {
      title:
        "связываем с вами и отправляем вам лучшие варианты в нашем чате",
    },
  ];

  const [activeTitle, setActiveTitle] = useState(-1);

  useEffect(() => {
    const pin = gsap.fromTo(
      "#subtitles",
      {
        translateY: 0,
      },
      {
        translateY: "-300vh",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: '#applications',
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          // markers: true
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
    <div className={styles.container} id='applications'>
      <h1 className={styles.title}>Как происходит подбор исполнителей</h1>
      <div id="subtitles" className={styles.subtitles}>
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