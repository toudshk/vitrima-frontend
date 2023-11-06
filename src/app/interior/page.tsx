"use client"

import React from "react";
import styles from "./page.module.scss";
import { useAuth } from "@/hooks/useAuth";

export default function Interior() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <div className={styles.container}>
          <div className={styles.title}>Интерьер</div>
        </div>
      ) : (
        <div>данная страница вам недоступна</div>
      )}
    </>
  );
}
