
"use client";
import React from "react";
import styles from "./page.module.scss";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import UploadField from "@/components/ui/Form-elements/upload-fields/UploadFields";
import { useForm } from "react-hook-form";
import { IWorkEditInput } from "./edit-work.interface";
const page: NextPageAuth = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();

  const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,

	// eslint-disable-next-line react-hooks/rules-of-hooks
	} = useForm<IWorkEditInput>({
		mode: 'onChange',
	})



  return (
    <>
      {user?.isContractor ? (
        <div className={styles.wrapper}>
          <div className={styles.leftBlock}>
            
           </div>
        </div>



      ) : (
        <div>у вас нет доступа</div>
      )}
    </>
  );
};
page.isOnlyContractor = true;

export default page;
