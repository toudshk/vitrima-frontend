import React from "react";
import styles from './page.module.scss'
import Link from "next/link";

const page = () => {
  return (
    <div className={styles.block}>
      <div className={styles.links}>
        <Link href="/interior">Интерьер</Link>
        <Link href="/architecture">Архитектура</Link>
      </div>
      <p>
        Выберите тип ленты, который вам интересен, чтобы смотреть работы,
        соответствующие вашим пожеланиям
      </p>
    </div>
  );
};

export default page;
