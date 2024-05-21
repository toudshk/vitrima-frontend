"use client";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import { Dialog, DialogContent } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./ContractorProfile.module.scss";
import MainButton from "@/components/ui/Button/MainButton";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { PaymentService } from "@/services/payment/payment.service";
import { useMutation } from "react-query";
import { useAuth } from "@/hooks/useAuth";

import { useRouter } from "next/navigation";
import { useUserInfo } from "../../chat/useUserInfo";

import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";

import "dayjs/locale/ru";
import Link from "next/link";
dayjs.extend(advancedFormat);
dayjs.locale("ru"); // Устанавливаем локаль

const ModalSubscription: FC<{ open: any; setOpen: any }> = ({
  open,
  setOpen,
}) => {
  const { user } = useAuth();
  const userId = user ? user._id : null;
  const { data } = useUserInfo(userId);
  const userData = data?.data;
  const isSubscribe = data?.data.isSubscribe;
  
  const router = useRouter();

  const { mutate } = useMutation(
    ["create payment"],
    () => PaymentService.createPayment(user!._id),
    {
      onSuccess(data) {
        router.push(data.data.confirmation.confirmation_url);
      },
    }
  );
  
  const handleClose = () => {
    setOpen(false);
  };

  
  const messageDate = dayjs(userData?.dayOfPayment).add(1, 'month');
  const currentDate = messageDate.format("D MMMM")

  
  
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      disableScrollLock
      PaperProps={{
        sx: {
          borderRadius: "16px", // Пример радиуса скругления краев
        },
      }}
    >
      <DialogContent sx={{ padding: "25px" }}>
        <div className={styles.container}>
          <div className={styles.mainTitle}>ежемесячная подписка</div>
          {isSubscribe ? (
            <div className=''>
              <div className="text-2xl font-bold">690 ₽</div>
              <div>Спишется {currentDate}</div>
              <div className='mt-6 w-full flex content-end'>
              <Link className="border-none bg-primary text-white p-3 rounded-xl ml-auto" href={"/unsubscribe"} onClick={handleClose} >
                Отменить подписку
              </Link></div>
            </div>
          ) : (
            <div className={styles.textBlock}>
              <div className={styles.topBlock}>
                <div className={styles.titleBlock}>
                  <div className={styles.checkImg}>
                    <CheckBoxOutlinedIcon />
                  </div>
                  <p className={styles.title}>
                    Неограниченное количество работ
                  </p>
                </div>
                <div className={styles.titleBlock}>
                  <div className={styles.checkImg}>
                    <CheckBoxOutlinedIcon />
                  </div>
                  <p className={styles.title}>
                    Работы будут чаще попадаться в ленте
                  </p>
                </div>
                <div className={styles.titleBlock}>
                  <div className={styles.checkImg}>
                    <CheckBoxOutlinedIcon />
                  </div>
                  <p className={styles.title}>
                    Преимущество перед подрядчиками без подписки
                  </p>
                </div>
              </div>
              <div className={styles.priceBlock}>
                <MainButton className="border-none" onClick={() => mutate()}>
                  Оформить подписку за 690 руб/мес.
                </MainButton>
                <a onClick={() => handleClose()}>отказаться</a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSubscription;
