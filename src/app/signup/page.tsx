"use client";
import Image from "next/image";
import { FC, useState } from "react";
import imageBg from "../../components/common/images/ui/authPage/AuthBg.png";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import styles from "./page.module.scss";
import SwitchButtons from "./SwitchButtons";
import MainButton from "@/components/ui/Button/MainButton";
import {
  FormState,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { IAuthInput } from "./Auth.interface";
import Link from "next/link";
import SignUpFields from "@/components/shared/user/SignUpFields";

interface IAuthFields {
  register: UseFormRegister<any>;
  formState: FormState<any>;
  isPasswordRequired?: boolean;
}

const SignupLayout: FC<IAuthFields> = () => {
  const [type, setType] = useState<"login" | "register">("login");

  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });

  const [selectedButton, setSelectedButton] = useState("contractor");

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
        <SignUpFields
          register={registerInput}
          formState={formState}
          selectedButton={selectedButton}
        />
        <div className={styles.authButtons}>
          <MainButton >Зарегистрироваться</MainButton>
        Есть аккаунт? <Link href={'/log-in'}>Войти</Link>
        </div>
      </div>
    </section>
  );
};
export default SignupLayout;
