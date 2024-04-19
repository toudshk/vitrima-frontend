"use client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Field from "@/components/ui/Form-elements/Field";
import styles from "./ResetPassword.module.scss";
import SecondButton from "@/components/ui/Button/SecondButton";
import { useNewPassword } from "./UseNewPassword";
const NewPassword: React.FC<{token:string}> = ({token}) => {
  const { onSubmit } = useNewPassword({token});
  const { handleSubmit, register } = useForm({
    mode: "onChange",
  });

  return (
    <div className="mt-6">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          {...register("newPassword", {
            required: "Пароль",
          })}
          placeholder="минимум 6 символов"
          style={{
            borderRadius: "12px",
          }}
        />

        <div >
          <SecondButton>Отправить</SecondButton>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
