import React, { FC, useRef } from "react";
import styles from "./About.module.scss";
import SphereModel from "./sphere-model/Sphere";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
const About: FC = () => {
  const sectionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const splitText = new SplitType("#about-title", { types: "chars,words" });
    let chars = splitText.chars;
    gsap.set(chars, { opacity: 0 });

    gsap.to(chars, {
      scrollTrigger: {
        trigger: "#about-title",
        start: "top 70%",
        // markers: true
      },
      yPercent: -20,
      opacity: 1,
      stagger: 0.005,
      duration: 0.2,
      ease: "power.out",
    });

    gsap.to("#subtitles", {
      scrollTrigger: {
        trigger: "#about-title",
        start: "top 70%",
        // markers: true
      },
      opacity: 1,
      delay: 1.5,
    });
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
            Заказать подбор
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
