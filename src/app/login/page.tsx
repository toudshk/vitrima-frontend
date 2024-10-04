"use client";
import { FC } from "react";
import styles from "../signup/page.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import LoginForms, { IAuthInput } from "@/components/shared/user/LoginForms";
import { useForm } from "react-hook-form";
import Link from "next/link";

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
    <section className={styles.container}>
      <div className={styles.leftBlock}>
        <Link
          href={"/"}
          className="text-white bg-gray-300 bg-opacity-50 rounded-2xl px-2 py-1 ml-auto  mt-4 mr-5 h-8 hover:bg-opacity-70"
        >
          На главную
          <ArrowForwardIcon fontSize='16px'/>
        </Link>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.logotype}>
          <MainLogoBlack width={595} />
        </div>
        <LoginForms formState={formState} />
      </div>
    </section>
  );
};
export default LoginLayout;
