import Image from "next/image";
import React from "react";
import bigImg from "../../../common/images/ui/mainPage/bigImage.jpg";
import smallImg from "../../../common/images/ui/mainPage/smallImage1.jpg";
import smallImg2 from "../../../common/images/ui/mainPage/smallImage2.jpg";
import bigImg2 from "../../../common/images/ui/mainPage/bigImage2.jpg";
import styles from "./OnboardCards.module.scss";
import smallImg3 from "../../../common/images/ui/mainPage/smallImage3.jpg";
import smallImg4 from "../../../common/images/ui/mainPage/smallImage4.jpg";
import { motion } from "framer-motion";


const OnboardCards = () => {


  return (
    <div className=" mx-auto ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1}}
        transition={{ duration: 1}}
        viewport={{ once: true }}
        className={styles.content}
      >
        <div className={styles.images}>
          <div className={styles.smallImages}>
            <Image
              className="mr-4"
              src={smallImg}
              height={500}
              width={500}
              alt={""}
              draggable={false}
            />
            <Image
              src={smallImg2}
              height={500}
              width={500}
              alt={""}
              draggable={false}
            />
          </div>
          <Image
            src={bigImg}
            height={500}
            width={1100}
            alt={""}
            draggable={false}
          />
        </div>
        <div className={styles.text}>
          <h1>Если вы подрядчик</h1>
          <p>
            Витрима – онлайн-платформа, где вы сможете продвигать свои услуги и
            расширить свою клиентскую базу. Мы создаем максимально короткий путь
            от вас – профессионального исполнителя – к вашим потенциальным
            заказчикам. Создайте профиль, загрузите свои работы – и вы сможете
            начать привлекать внимание клиентов и увеличивать свою популярность.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1}}
        transition={{ duration: 1}}
        viewport={{ once: true }}
        className={styles.content}
      >
        <div className={styles.text}>
          <h1>Если вы соискатель</h1>
          <p>
            Витрима – онлайн-платформа, которая максимально упростит процесс
            подбора подрядчика. Мы ценим ваше время, поэтому предлагаем только
            надежных и проверенных специалистов. Благодаря проработанной системе
            фильтров и удобной ленте работ вы с легкостью сможете найти
            исполнителя, который подойдет именно вам.
          </p>
        </div>
        <div className={styles.images}>
          <div className={styles.smallImages}>
            <Image
              className="mr-4"
              src={smallImg3}
              height={440}
              width={440}
              alt={""}
              draggable={false}
            />
            <Image
              src={smallImg4}
              height={440}
              width={440}
              alt={""}
              draggable={false}
            />
          </div>
          <Image
            src={bigImg2}
            height={500}
            width={1000}
            alt={""}
            draggable={false}
          />
        </div>
        </motion.div>
      </div>
    
  );
};

export default OnboardCards;
