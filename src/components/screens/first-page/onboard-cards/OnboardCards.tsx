import Image from "next/image";
import React from "react";
import bigImg from "../../../common/images/ui/mainPage/bigImage.png"
import smallImg from "../../../common/images/ui/mainPage/smallImage1.png";
import smallImg2 from "../../../common/images/ui/mainPage/smallImage2.png";
import bigImg2 from "../../../common/images/ui/mainPage/bigImage2.png";
import styles from "./OnboardCards.module.scss";
import smallImg3 from "../../../common/images/ui/mainPage/smallImage3.png";
import smallImg4 from "../../../common/images/ui/mainPage/smallImage4.png";
const OnboardCards = () => {
  return (
    <div>
      <div className={styles.content}>
        <div className={styles.images}>
          <Image
            className="mr-4"
            src={bigImg}
            height={960}
            width={472}
            alt={""}
          />
          <div>
            <Image
              className="mb-4"
              src={smallImg}
              height={472}
              width={472}
              alt={""}
            />
            <Image src={smallImg2} height={472} width={472} alt={""} />
          </div>
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
          <div>
            <Image
              className="mb-4"
              src={smallImg3}
              height={472}
              width={472}
              alt={""}
            />
            <Image src={smallImg4} height={472} width={472} alt={""} />
          </div>
          <Image className="ml-4" src={bigImg2} height={960} width={472} alt={""} />
        </div>
      </div>
    </div>
  );
};

export default OnboardCards;
