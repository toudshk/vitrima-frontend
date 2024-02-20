"use client";
import React from "react";
import styles from "./page.module.scss";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import UploadField from "@/components/ui/Form-elements/upload-fields/UploadFields";
import { useForm } from "react-hook-form";

import { redirect, useRouter } from "next/navigation";
import { IWorkEditInput } from "@/app/add-work/edit-work.interface";
import UpdateWork from "@/components/screens/update-work/UpdateWork";

const Page: NextPageAuth = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();
 
  if (!user?.isContractor) {
    redirect("/");
  }
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,

    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<IWorkEditInput>({
    mode: "onChange",
  });

  return (
    <>
      <div className={styles.wrapper}>
        <UpdateWork />
      </div>
    </>
  );
};

export default Page;
