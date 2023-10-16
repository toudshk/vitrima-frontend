

import { MainLogo } from "@/components/common/icons/MainLogo";
import styles from "./page.module.scss";
import OnboardCards from "@/components/screens/first-page/onboard-cards/OnboardCards";
import Footer from "@/components/layout/footer/Footer";
import RegisterBanner from "@/components/screens/first-page/register-banner/RegisterBanner";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.iconContent}>
        <MainLogo width={590} />

        <h4>Сервис возможностей </h4>
      </div>
      <div className={styles.detailed}>Подробнее</div>
      <OnboardCards />
      <RegisterBanner />
      <Footer />
    </div>
  );
}
