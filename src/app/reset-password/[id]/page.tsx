"use client";
import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import Feedback from "@/components/screens/feedback/Feedback";
import styles from "../page.module.scss"
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import ResetPassword from "@/components/screens/reset-password/ResetPassword";
import NewPassword from "@/components/screens/reset-password/NewPassword";
import { usePathname } from "next/navigation";
const Page: NextPageAuth = () => {
 const pathname = usePathname()
 const token = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <>
    <section className={styles.container}>
      <div className={styles.leftBlock}>
       
      </div>
      <div className={styles.rightBlock}>
        {/* <div className={styles.logotype}>
          <MainLogoBlack width={595} />
        </div> */}
        <h1 className="text-2xl font-bold mb-6">Сбросить пароль</h1>
        
        <NewPassword token={token}/>
      </div>
    </section>
    </>
  );
};

export default Page;
