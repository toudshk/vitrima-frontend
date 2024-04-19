"use client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Field from "@/components/ui/Form-elements/Field";
import styles from "./ResetPassword.module.scss";
import SecondButton from "@/components/ui/Button/SecondButton";
import { useResetPassword } from "./UseResetPassword";
const ResetPassword: React.FC = () => {
  const { onSubmit } = useResetPassword();
  const { handleSubmit, register } = useForm({
    mode: "onChange",
  });

  return (
    <div className="mt-6">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          {...register("email", {
            required: "Ваша почту",
          })}
          placeholder="Почта"
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

export default ResetPassword;
