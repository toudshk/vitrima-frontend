import { FC } from "react";
import styles from "./UnsubscribeModal.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSubscribe } from "./useSubsrcribe";
import { useAuth } from "@/hooks/useAuth";
const UnsubscribeModal: FC = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back(); // Вернуть пользователя на предыдущую страницу
  };
  const {user} = useAuth()
 
  const {onSubmit} = useSubscribe()
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
            Поделитесь, почему решили отменить подпииску?
          </h1>
          <ul>
            <li>
                <button onClick={() => onSubmit(user!._id)}>Подписка стоит дорого</button></li>
            <li>Отменяю по другой причине</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribeModal;
