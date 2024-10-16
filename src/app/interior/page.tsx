import React from "react";
import styles from "./page.module.scss";

import InteriorGallery from "@/components/screens/main-page/Gallery";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import Filter from "@/components/screens/filter/Filter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Лента с проектами интерьера.",
}
export default function Page() {
  return (
    <>
      <div className={styles.container}>
        <div className="flex justify-between mx-[1vw] items-center mb-[1vw]">
          <div className={styles.title}>Интерьер</div>

          <Filter />
        </div>
        <InteriorGallery slug={"interior"} />
      </div>
    </>
  );
}
