
import Image from "next/image";
import { FC, useState } from "react";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import styles from "./page.module.scss";
import SignUpForms from "@/components/shared/user/SignUpForms";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Metadata } from "next";
import SignUpFormsWorkers from "@/components/shared/user/SignUpFormsWorkers";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Присоединяйтесь к нам и начинайте воплощать в жизнь творческие идеи.",
}

const page: FC = () => {


  
  return (
    <section className={styles.container}>
      <div className={styles.leftBlock}>
      <Link
          href={"/"}
          className="text-white bg-gray-300 bg-opacity-50 rounded-2xl px-2 py-1 ml-auto  mt-4 mr-5 h-8 hover:bg-opacity-70"
        >
          На главную
          <ArrowForwardIcon fontSize='small'/>
        </Link>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.logotype}>
          <MainLogoBlack width={595} />
        </div>
        <SignUpFormsWorkers     />
        
      </div>
    </section>
  );
};
export default page;
