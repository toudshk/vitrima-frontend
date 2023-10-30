"use client"
import imageBg from "@/components/common/images/ui/authPage/AuthBg.png";
import { FC } from "react";
import styles from "../signup/page.module.scss";
import Image from "next/image";

import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import LoginForms, { IAuthInput } from "@/components/shared/user/LoginForms";
import { useForm } from "react-hook-form";

const LoginLayout: FC = () => {
  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });


  return (
    <section className="flex">
      <div className={styles.leftBlock}>
        <Image src={imageBg} width={952} height={1080} alt={""} />
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.logotype}>
          <MainLogoBlack width={595} />
        </div>
        <LoginForms formState={formState}  />
      </div>
    </section>
  );
};
export default LoginLayout;
