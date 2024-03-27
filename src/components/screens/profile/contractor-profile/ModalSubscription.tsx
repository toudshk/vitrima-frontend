"use client";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import { Dialog, DialogContent } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./ContractorProfile.module.scss";
import MainButton from "@/components/ui/Button/MainButton";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
const ModalSubscription: FC<{ open: any; setOpen: any }> = ({
  open,
  setOpen,
}) => {
 


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}

      onClose={handleClose}
      disableScrollLock
    >
      <DialogContent sx={{ padding: "25px" }}>
        <div className={styles.container}>
          <div className={styles.mainTitle}>ежемесячная подписка</div>
          <div className={styles.textBlock}>
            <div className={styles.topBlock}>
              <div className={styles.titleBlock}>
                <div className={styles.checkImg}>
                  <CheckBoxOutlinedIcon />
                </div>
                <p className={styles.title}>Неограниченное количество работ</p>
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
              <MainButton className="border-none  ">
                Оформить подписку за 299 руб/мес.
              </MainButton>
              <a onClick={() => handleClose()}>отказаться</a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSubscription;
