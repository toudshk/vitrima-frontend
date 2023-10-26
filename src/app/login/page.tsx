"use client";

import Image from "next/image";
import { FC, useState } from "react";
import imageBg from "../../components/common/images/ui/authPage/AuthBg.png";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import styles from "../signup/page.module.scss";
import Button from "@/components/ui/Button/MainButton";
import SwitchButtons from "../signup/SwitchButtons";
import MainButton from "@/components/ui/Button/MainButton";

import {
  FormState,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
  useForm,
  SubmitHandler,
} from "react-hook-form";
import { validEmail } from "@/components/shared/regex";
import AuthFields from "@/components/shared/user/AuthFields";
import { IAuthInput } from "../signup/Auth.interface";
import Link from "next/link";
import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";

interface IAuthFields {
  register: UseFormRegister<any>;
  formState: FormState<any>;
  isPasswordRequired?: boolean;
}

const LoginLayout: FC<IAuthFields> = () => {
  const {login}= useActions();

  const [type, setType] = useState<"login" | "register">("login");

  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
    login(data);
    return reset();
  };

  const [selectedButton, setSelectedButton] = useState("contractor");
  console.log(selectedButton);
  return (
    <section className="flex">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.leftBlock}>
          <Image src={imageBg} width={952} height={1080} alt={""} />
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.logotype}>
            <MainLogoBlack width={595} />
          </div>
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
        </div>
      </form>
    </section>
  );
};
export default LoginLayout;
