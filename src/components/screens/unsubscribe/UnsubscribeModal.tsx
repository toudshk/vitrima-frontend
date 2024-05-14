import { FC } from "react";
import styles from "./UnsubscribeModal.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSubscribe } from "./useSubsrcribe";
import { useAuth } from "@/hooks/useAuth";
import { useFeedback } from "../feedback/UseFeedback";
import { useForm } from "react-hook-form";
import SecondButton from "@/components/ui/Button/SecondButton";
import Field from "@/components/ui/Form-elements/Field";
import { useUnsubscribe } from "./useUnsubscribe";
const UnsubscribeModal: FC = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back(); // Вернуть пользователя на предыдущую страницу
  };
  const {user} = useAuth()
  const { handleSubmit, register } = useForm({
    mode: "onChange",
  });
  const { onSubmit } = useUnsubscribe();
  
  return (
    <div className={styles.container}>
      <div className="w-[50%] max-w-[700px]">
        <button className="mb-3 text-lg" onClick={handleGoBack}>
          {" "}
          <ArrowBackIosNewIcon />
          Редактирование профиля
        </button>
        <div className={styles.block}>
          <h1 className={styles.title}>
            Поделитесь, почему решили отменить подписку?
          </h1>
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
          {/* <ul>
            <li>
                <button onClick={() => onSubmit(user!._id)}>Подписка стоит дорого</button></li>
            <li>Отменяю по другой причине</li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default UnsubscribeModal;
