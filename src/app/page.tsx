import { MainIcon } from "@/components/common/icons/MainIcon";
import styles from "./page.module.scss";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.iconContent}>
        <MainIcon width={590} />

        <h4>Сервис возможностей</h4>
      </div>
      <div className={styles.detailed}>Подробнее</div>
    </div>
  );
}
