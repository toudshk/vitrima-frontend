"use client";

import SwitchButtons from "@/app/signup/SwitchButtons";
import AuthFields from "@/components/shared/user/AuthFields";
import { useActions } from "@/hooks/useActions";
import { login } from "@/store/user/user.actions";
import React, { FC, useState } from "react";
import { FormState, SubmitHandler, useForm } from "react-hook-form";
import styles from "@/app/signup/page.module.scss";
import MainButton from "@/components/ui/Button/MainButton";
import Link from "next/link";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

interface IAuthFields {
  formState: FormState<any>;
  isPasswordRequired?: boolean;
}
export interface IAuthInput {
  email: string;
  password: string;
}

const LoginForms: FC<IAuthFields> = () => {
  useAuthRedirect()
  const { login } = useActions();
  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });

  const [selectedButton, setSelectedButton] = useState("contractor");

  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
    login(data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SwitchButtons
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />
      <AuthFields
        register={registerInput}
        formState={formState}
        selectedButton={selectedButton}
      />
      <div className={styles.authButtons}>
        <MainButton type="submit" onClick={() => onSubmit}>
          Войти
        </MainButton>
        Нет аккаунта? <Link href={"/signup"}>Зарегиструйся</Link>
      </div>
    </form>
  );
};

export default LoginForms;
