
import { FC } from "react";
import { WhiteIconLogo } from "../../common/icons/WhiteIconLogo";
import styles from './Footer.module.scss'
import Link from "next/link";


const Footer = () => {
  return (
    <div className={styles.content}>
      <div className={styles.topBlock}>
        <WhiteIconLogo width={24} />

     
      </div>
      <div>
        <ul className={styles.links}>
         
            <li className={styles.link} >Все права защищены</li>
            <li className={styles.link} >Политика конфиденциальности</li>
            <li className={styles.link} >Использование файлов cookie</li>
            <li className={styles.link} ><Link href={"/documents"}>Правовая информация</Link></li>
            
        </ul>
      </div>
    </div>
  );
};

export default Footer;
