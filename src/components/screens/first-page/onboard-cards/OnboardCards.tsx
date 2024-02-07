import Image from "next/image";
import React from "react";
import bigImg from "../../../common/images/ui/mainPage/bigImage.jpg";
import smallImg from "../../../common/images/ui/mainPage/smallImage1.jpg";
import smallImg2 from "../../../common/images/ui/mainPage/smallImage2.jpg";
import bigImg2 from "../../../common/images/ui/mainPage/bigImage2.jpg";
import styles from "./OnboardCards.module.scss";
import smallImg3 from "../../../common/images/ui/mainPage/smallImage3.jpg";
import smallImg4 from "../../../common/images/ui/mainPage/smallImage4.jpg";
const OnboardCards = () => {
  return (
    <div className='max-w-[1736px] mx-auto'>
      <div className={styles.content}>
        <div className={styles.images}>
         
          <div className={styles.smallImages}>
            <Image
              src={smallImg}
              height={245}
              width={245}
              alt={""}
              
            />
            <Image src={smallImg2} height={245} width={245} alt={""} />
          </div>
          <Image src={bigImg} height={960} width={472} alt={""} />
        </div>
        <div className={styles.text}>
          <h1>Подрядчики</h1>
          <p>
            Наш сервис поиска подрядчиков предоставляет широкие возможности для
            профессионалов в строительной сфере. С его помощью подрядчики
            получают уникальную возможность продвигать свои услуги, привлекать
            новых клиентов и увеличивать свою клиентскую базу. Благодаря
            удобному интерфейсу и легкой навигации, подрядчики могут легко
            создать свой профиль, добавить информацию о своем опыте работы и
            предлагаемых услугах.
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>Соискатели</h1>
          <p>
            Наш сервис поиска подрядчиков предоставляет широкие возможности для
            профессионалов в строительной сфере. С его помощью подрядчики
            получают уникальную возможность продвигать свои услуги, привлекать
            новых клиентов и увеличивать свою клиентскую базу. Благодаря
            удобному интерфейсу и легкой навигации, подрядчики могут легко
            создать свой профиль, добавить информацию о своем опыте работы и
            предлагаемых услугах.
          </p>
        </div>
        <div className={styles.images}>
          <div className={styles.smallImages}>
            <Image
           
              src={smallImg3}
              height={245}
              width={245}
              alt={""}
            />
            <Image src={smallImg4} height={245} width={245} alt={""} />
          </div>
          <Image src={bigImg2} height={960} width={472} alt={""} />
        </div>
      </div>
    </div>
  );
};

export default OnboardCards;
