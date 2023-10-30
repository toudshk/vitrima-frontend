

import SwitchButtons from "@/app/signup/SwitchButtons";
import AuthFields from "@/components/shared/user/AuthFields";
import { useActions } from "@/hooks/useActions";
import { login, registerApplicant, registerContractor } from "@/store/user/user.actions";
import React, { FC, useState } from "react";
import { FormState, SubmitHandler, useForm } from "react-hook-form";
import styles from '@/app/signup/page.module.scss'
import MainButton from "@/components/ui/Button/MainButton";
import Link from "next/link";
import SignUpFields from "./SignUpFields";
import { IAuthInput } from "@/app/signup/Auth.interface";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
interface IAuthFields {
  formState: FormState<any>;
  isPasswordRequired?: boolean;
}


const SignUpForms: FC<IAuthFields> = () => {

    const { registerContractor, registerApplicant } = useActions();

    const {
        register: registerInput,
        handleSubmit,
        formState,
        reset,
      } = useForm<IAuthInput>({
        mode: "onChange",
      });

  const [selectedButton, setSelectedButton] = useState<
  "contractor" | "applicant"
>("contractor");
  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
   

    if (selectedButton === "contractor") registerContractor(data) ;
      else if (selectedButton === "applicant") registerApplicant(data);
    reset();
  };
  
  return <form onSubmit={handleSubmit(onSubmit)}>
  <SwitchButtons
    selectedButton={selectedButton}
    setSelectedButton={setSelectedButton}
  />
  <SignUpFields
    register={registerInput}
    formState={formState}
    selectedButton={selectedButton}
  />
  <div className={styles.authButtons}>
    <MainButton type="submit" onClick={() => onSubmit}>
      Зарегистрироваться
    </MainButton>
    Есть аккаунт? <Link href={"/login"}>Войди</Link>
  </div>
</form>;
};

export default SignUpForms;
