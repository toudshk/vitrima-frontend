"use client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Field from "@/components/ui/Form-elements/Field";
import { useFeedback } from "./UseFeedback";
import styles from "./Feedback.module.scss";
import SecondButton from "@/components/ui/Button/SecondButton";
const Feedback: React.FC = () => {
  const params = useParams();
  const { onSubmit } = useFeedback();
  const { handleSubmit, register } = useForm({
    mode: "onChange",
  });

  return (
    <div className="mt-14">
        <div className={styles.titleBlock}>
      <h1 className={styles.title}>Ваши пожелания</h1>
<p className={styles.subtitle}>Благодаря вам платформа будет развиваться</p>
</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          {...register("feedback", {
            required: "Ваше сообщение",
          })}
          placeholder=""
          style={{
            borderRadius: "8px",
          }}
        />

        <div className="text-right ml-auto">
          <SecondButton>Отправить</SecondButton>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
