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
      <DialogContent sx={{ padding: "20px" }}>
        <div className={styles.container}>
            <div className={styles.textBlock}>
          <div className={styles.logo}>
            <MainLogoBlack width={400} />
          </div>
          <p className={styles.description}>Подписка без лишних переплат</p>

          <div className={styles.title}>Месячная подписка на платформе</div>
          </div>
          <div className={styles.priceBlock}>
            <p className={styles.price}>299р</p>
            <MainButton>Подключить</MainButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSubscription;
