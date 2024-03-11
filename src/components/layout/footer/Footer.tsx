import { FC } from "react";
import { WhiteIconLogo } from "../../common/icons/WhiteIconLogo";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.content}>
      <div className={styles.topBlock}>
        <WhiteIconLogo width={24} />
      </div>
      <div className="flex">
        <ul className={styles.links}>
          {/* <li className={styles.link} >Все права защищены</li> */}
          <li className={styles.link}>
            <Link href={"/documents"}>Политика конфиденциальности</Link>
          </li>
          <li className={styles.link}>
            <Link href={"/documents"}>Использование файлов cookie</Link>
          </li>
          <li className={styles.link}>
            <Link href={"/documents"}>Правовая информация</Link>
          </li>
        </ul>
        <div className={styles.contacts}>
          <div>
            Малявко Михаил Дмитриевич ИНН 28080201673 ОГРНИП 323470400016032
          </div>

          <div>
            КОНТАКТЫ: телефон: +7 (911) 246-29-84
             почтовый адрес: г. Санкт-Петербург,Василеостровский район, Наличная улица, 36 к7, кв.122, 199397 
             эл. почта: vitrima.pro@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
