"use client";
import React from "react";
import styles from "./page.module.scss";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import UploadField from "@/components/ui/Form-elements/upload-fields/UploadFields";
import { useForm } from "react-hook-form";
import { IWorkEditInput } from "./edit-work.interface";
import { useRouter } from "next/navigation";
import AddWork from "@/components/screens/add-work/AddWork";

const page: NextPageAuth = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if (!user?.isContractor) {
    
    router.push('/');
   

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
          <AddWork/>
        </div>
    </>
  );
};
page.isOnlyContractor = true;

export default page;
