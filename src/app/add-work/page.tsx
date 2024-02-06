"use client";
import React from "react";
import styles from "./page.module.scss";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import AddWork from "@/components/screens/add-work/AddWork";

const page: NextPageAuth = () => {
  
  
  return (
    <>
      <div className={styles.wrapper}>
        <AddWork />
      </div>
    </>
  );
};
page.isOnlyContractor = true;

export default page;
