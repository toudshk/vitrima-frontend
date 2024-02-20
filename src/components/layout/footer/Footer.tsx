
import { FC } from "react";
import { WhiteIconLogo } from "../../common/icons/WhiteIconLogo";
import styles from './Footer.module.scss'
const data = [
  {
    title: "VITRIMA",
    id: 0,
  },
  {
    title: "Все права защищены",
    id: 1,
  },
  {
    title: "Политика конфиденциальности",
    id: 2,
  },
  {
    title: "Использование файлов cookie",
    id: 3,
  },
  {
    title: "Правовая информация",
    id: 4,
  },
];

const Footer = () => {
  return (
    <div className={styles.content}>
      <div className={styles.topBlock}>
        <WhiteIconLogo width={24} />

     
      </div>
      <div>
        <ul className={styles.links}>
          {data.map((item) => (
            <li className={styles.link} key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
