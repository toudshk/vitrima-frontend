"use client";
import React from "react";
import styles from "./page.module.scss";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import AddWork from "@/components/screens/add-work/AddWork";

const Page: NextPageAuth = () => {
  const { user } = useAuth();
  if (!user || user?.isContractor === false) {
    redirect("/");
  }

  return (
    <>
      <div className={styles.wrapper}>
        <AddWork />
      </div>
    </>
  );
};

export default Page;
