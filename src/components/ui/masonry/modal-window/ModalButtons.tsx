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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
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
    const isSubscribed = userData?.subscriptions?.some(
      (subscription: any) => subscription._id === workData?.contractorId._id
    );

    setIsSubscribed(isSubscribed || false);
    const isWorkSaved = userData?.saved?.some(
      (savedWork: any) => savedWork._id === workData?._id
    );
    setIsSaved(isWorkSaved || false);
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
      {user &&
        (user?._id !== workData?.contractorId._id ? (
          <>
            {user?.isContractor === false && (
              <div className="flex">
                <button
                  className={styles.button}
                  onClick={isSaved ? handleRemoveSavedWork : handleAddSavedWork}
                >
                  {isSaved ? (
                    <BookmarkAddedOutlinedIcon />
                  ) : (
                    <BookmarkAddOutlinedIcon />
                  )}
                </button>
                <button
                className={isSubscribed ? styles.secondButton : styles.button}
                onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
              >
                {isSubscribed ? "Отписаться" : "Подписаться"}
              </button>
              </div>
              
            )}

           
          </>
        ) : (
          <div className="flex ">
            <button
              className={styles.button}
              onClick={() => deleteAsync(workData?._id)}
            >
              <DeleteOutlineOutlinedIcon />
            </button>
            <Link
              href={`/update-work/${workData?._id}`}
              className={styles.link}
            >
              <EditOutlinedIcon />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ModalButtons;
