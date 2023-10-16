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
import { FormState, UseFormRegister, useForm } from "react-hook-form";
import { validEmail } from "@/components/shared/regex";


interface IAuthFields {
	register: UseFormRegister<any>
	// formState: FormState<any>
	isPasswordRequired?: boolean
}

const LoginLayout: FC<IAuthFields> = ({
	register,
	// formState: { errors },
	isPasswordRequired = false,
}) => {
  const [type, setType] = useState<"login" | "register">("login");

  return (
    <section className="flex ">
      <div className={styles.leftBlock}>
        <Image src={imageBg} width={952} height={1080} alt={""} />
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.logotype}>
          <MainLogoBlack width={595} />
        </div>
        <SwitchButtons />
        <form>
          <Field
            // {...register("email", {
            //   required: "Email is required!",
            //   pattern: {
            //     value: validEmail,
            //     message: "Please enter a valid email",
            //   },
            // })}
            placeholder="E-mail"
            // error={errors.email}
          />
          <Field
            // {...register(
            //   "password",
            //   isPasswordRequired
            //     ? {
            //         required: "Password is required!",
            //         minLength: {
            //           value: 6,
            //           message: "Min length should more 6 symbols!",
            //         },
            //       }
            //     : {}
            // )}
            placeholder="Password"
            type="password"
            // error={errors.password}
          />

          <div className={styles.buttons}>
            <MainButton text={"Вход"} px={0}/>
           
            
            <MainButton text={"Регистрация"} px={0}/>
             
          </div>
        </form>
      </div>
    </section>
  );
}
export default LoginLayout