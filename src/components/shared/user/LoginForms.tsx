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
import { toast } from "react-toastify";

interface IAuthFields {
  formState: FormState<any>;
  isPasswordRequired?: boolean;
}
export interface IAuthInput {
  email: string;
  password: string;
}

const LoginForms: FC<IAuthFields> = () => {
  useAuthRedirect();
  const { login } = useActions();
  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
    setError,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });

  const [selectedButton, setSelectedButton] = useState("contractor");
  const [isLoading, setIsLoading] = useState(false); 
  const onSubmit: SubmitHandler<IAuthInput> = async (data) => {
    // Отключаем кнопку перед отправкой данных
    setIsLoading(true);

    try {
      await login(data);
      reset();
    } catch (error) {
      
       setError('email', { message: 'Ошибка входа' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     <SwitchButtons
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />
    <form onSubmit={handleSubmit(onSubmit)}>
     
      <AuthFields
        register={registerInput}
        formState={formState}
      />

<div className={styles.authButtons}>
        {/* Используем isLoading для отключения кнопки */}
        <MainButton type="submit" onClick={() => onSubmit} disabled={isLoading}>
          {isLoading ? 'Подождите' : 'Войти'}
        </MainButton>
        <div className="text-xl mt-[2vh]">
          Нет аккаунта?
          <Link href={"/signup"} className="ml-2 ">
            Зарегиструйся
          </Link>
        </div>
      </div>
    </form>
    </>
  );
};

export default LoginForms;
