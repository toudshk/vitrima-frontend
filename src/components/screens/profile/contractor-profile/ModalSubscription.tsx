"use client";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import { Dialog, DialogContent } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./ContractorProfile.module.scss";
import MainButton from "@/components/ui/Button/MainButton";

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
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      disableScrollLock
    >
      <DialogContent sx={{ padding: "25px" }}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <MainLogoBlack width={350} />
          </div>
          <div className={styles.textBlock}>
            <div className={styles.topBlock}>
              <p className={styles.title}>Расширьте свои возможности с нами!</p>

              <div className={styles.subtitle}>
                С подпиской вы сможете продемонстрировать весь свой талант в
                полном объеме.
              </div>
            </div>
            <div className={styles.priceBlock}>
              <MainButton>Оформить подписку за 299 рублей</MainButton>
              <a onClick={() => handleClose()}>отказаться</a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSubscription;
