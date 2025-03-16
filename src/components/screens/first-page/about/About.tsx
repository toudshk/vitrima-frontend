import React, { FC, useRef } from "react";
import styles from "./About.module.scss";
import SphereModel from "./sphere-model/Sphere";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
const About: FC = () => {
  const sectionRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.to("#about-title", {
      scrollTrigger: {
        trigger: "#about-title",
        start: "top 95%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to("#subtitles", { opacity: 1, delay: 1.5, pointerEvents: "all" });
  }, []);
  return (
    <section className={styles.container} ref={sectionRef}>
      <div className={styles.model}>
        <SphereModel />
      </div>
      <div className={styles.textBlock}>
        <span id="about-title">
          Почему вы должны доверить нам подбор исполнителей в сфере интерьера и
          архитектуры?
        </span>

        <div className={styles.bottomText} id="subtitles">
          <p>
            Годы работы с заказчиками по всей стране. С нами вы найдете лучшего
            кандидата в вашем городе или на другой стороне планеты
          </p>
          {/* <ul>
          <li>Персональный подход</li>
          <li>Эффективное исполнение</li>
          <li>Бесплатный подбор</li>
        </ul> */}
          <Link href={"/project"} className={styles.link}>
            Заказать подбор исполнителей
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
