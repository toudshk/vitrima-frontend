"use client";
import Image from "next/image";
import { FC, useState } from "react";
import imageBg from "../../components/common/images/ui/authPage/AuthBg.png";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import styles from "./page.module.scss";
import Button from "@/components/ui/Button/MainButton";
import SwitchButtons from "./SwitchButtons";
import MainButton from "@/components/ui/Button/MainButton";
import Field from "@/components/ui/Form-elements/Field";
import {
  FormState,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import { validEmail } from "@/components/shared/regex";
import AuthFields from "@/components/shared/user/AuthFields";
import { IAuthInput } from "./Auth.interface";

interface IAuthFields {
  register: UseFormRegister<any>;
  formState: FormState<any>;
  isPasswordRequired?: boolean;
}

const LoginLayout: FC<IAuthFields> = () => {
  const [type, setType] = useState<"login" | "register">("login");

  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });

  const [selectedButton, setSelectedButton] = useState("button1");

  return (
    <section className="flex">
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
          <MainButton>Зарегистрироваться</MainButton>
          <MainButton>Войти</MainButton>
        </div>
      </div>
    </section>
  );
};
export default LoginLayout;
