import React from "react";
import styles from './page.module.scss'
import Link from "next/link";
import SelectFeed from "@/components/screens/select-feed/SelectFeed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Лучшие работы дизайнеров представлены для вас",
  description: "Выберите какая лента подходит вам",
}

const page = () => {
  return (
    <SelectFeed/>
  );
};

export default page;
