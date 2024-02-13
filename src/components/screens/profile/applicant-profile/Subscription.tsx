"use client";
import { useSubscribe } from "@/hooks/subscribe/useSubscribe";
import { useUnSubscribe } from "@/hooks/subscribe/useUnSubscribe";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import { FC, useState } from "react";
import checkMarkSvg from "@/app/assets/images/check-mark.svg";
import plusMarkSvg from "@/app/assets/images/plus.svg";
import styles from './ApplicantProfile.module.scss'
interface ISubscription {
  nickname: string;
  email: string;
  image: string;
  _id: string;
}

interface IData {
  data: ISubscription;
}

const Subscription: FC<IData> = ({ data }) => {
  const { user } = useAuth();
  const userId = user?._id;
  const { onSubmit: unSubscribeSubmit } = useUnSubscribe(
    userId || "",
    data._id
  );
  const { onSubmit: subscribeSubmit } = useSubscribe(userId || "", data._id);

  const [isSubscribed, setIsSubscribed] = useState(true);
  const handleSubscribe = async () => {
    await subscribeSubmit();
    setIsSubscribed(true);
  };

  const handleUnsubscribe = async () => {
    await unSubscribeSubmit();
    setIsSubscribed(false);
  };

  return (
    <div className={styles.subscriptionTitle}>
      <Link className={styles.title} href={`/profile/${data._id}`}>
        {data.nickname}
      </Link>
    <div className={styles.buttonBlock}>
        {isSubscribed ? (
          <button  className={styles.firstButton} onClick={handleUnsubscribe}>
            <Image className={styles.checkmark} src={checkMarkSvg} width={17} height={12} alt={""} />
            Вы подписаны
          </button>
        ) : (
            <button className={styles.secondButton} onClick={handleSubscribe}>
            <Image className={styles.checkmark} src={plusMarkSvg} width={17} height={15} alt={""} />
            Подписаться
          </button>
        )}
     </div>
    </div>
  );
};

export default Subscription;
