"use client";
import React, { FC, useState, useEffect } from "react";
import { useSubscribe } from "@/hooks/subscribe/useSubscribe";
import { useUnSubscribe } from "@/hooks/subscribe/useUnSubscribe";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useUser } from "@/components/screens/profile/useUser";
import styles from "../ModalWindow.module.scss";
import { useWorks } from "@/components/screens/profile/useWorks";
import { IWork } from "@/components/shared/types/work.types";
import { useAddSavedWork } from "@/hooks/saved-work/useAddSavedWork";
import { useRemoveSavedWork } from "@/hooks/saved-work/useRemoveSavedWork";
import ShareSvg from "@/app/assets/images/share.svg";
import Link from "next/link";
const ModalButtons: FC<{ workData: IWork }> = ({ workData }) => {
  const { user } = useAuth();

  const userId = user?._id || "";
  const { data: userData } = useUser(userId);
  const { deleteAsync } = useWorks();
  const { onSubmit: addSavedWorkSubmit } = useAddSavedWork(
    userId,
    workData._id
  );
  const { onSubmit: removeSavedWorkSubmit } = useRemoveSavedWork(
    userId,
    workData._id
  );
  const { onSubmit: unSubscribeSubmit } = useUnSubscribe(
    userId,
    workData?.contractorId._id
  );
  const { onSubmit: subscribeSubmit } = useSubscribe(
    userId,
    workData?.contractorId._id
  );

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSubscribed(
      userData?.subscriptions?.includes(workData?.contractorId._id) || false
    );
    setIsSaved(userData?.saved?.includes(workData?._id) || false);
  }, [userData, workData]);

  const handleSubscribe = async () => {
    await subscribeSubmit();
    setIsSubscribed(true);
  };

  const handleUnsubscribe = async () => {
    await unSubscribeSubmit();
    setIsSubscribed(false);
  };

  const handleAddSavedWork = async () => {
    await addSavedWorkSubmit();
    setIsSaved(true);
  };

  const handleRemoveSavedWork = async () => {
    await removeSavedWorkSubmit();
    setIsSaved(false);
  };
  return (
    <div className={styles.buttons}>
      {user?._id !== workData?.contractorId._id ? (
        <>
          <div className={styles.leftButtons}>
            <button className={`${styles.secondButton} mr-[0.7vw]`}>
              <div className={styles.icon}>
                Отправить{" "}
                <Image
                  className="ml-1 w-[1vw] "
                  src={ShareSvg}
                  alt={""}
                  height={16}
                  width={16}
                />
              </div>
            </button>
            <button
              className={styles.secondButton}
              onClick={isSaved ? handleRemoveSavedWork : handleAddSavedWork}
            >
              {isSaved ? "Удалить из сохраненного" : "Сохранить"}
            </button>
          </div>

          <button
            className={styles.button}
            onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
          >
            {isSubscribed ? "Отписаться" : "Подписаться"}
          </button>
        </>
      ) : (
        <>
          <button
            className={styles.button}
            onClick={() => deleteAsync(workData?._id)}
          >
            удалить работу
          </button>
          <Link
            href={`/update-work/${workData?._id}`}
            className={styles.link}
          >
          редактировать работу
          </Link>
        </>
      )}
    </div>
  );
};

export default ModalButtons;
