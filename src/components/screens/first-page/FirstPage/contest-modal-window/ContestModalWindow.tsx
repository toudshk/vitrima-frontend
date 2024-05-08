"use client";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import { Dialog, DialogContent } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./ContestModalWindow.module.scss";
import MainButton from "@/components/ui/Button/MainButton";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { PaymentService } from "@/services/payment/payment.service";
import { useMutation } from "react-query";
import { useAuth } from "@/hooks/useAuth";

import { useRouter } from "next/navigation";
import { useUserInfo } from "../../../chat/useUserInfo";

import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";

const ContestModalWindow: FC<{ open: any; setOpen: any }> = ({
    open,
    setOpen,
  }) => {
    const { user } = useAuth();
    const userId = user ? user._id : null;
  
   
    const router = useRouter();
  
   
    const handleClose = () => {
      setOpen(false);
    };
  
    
    
    return (
      <Dialog
        fullWidth
        maxWidth="md"
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
            <div className={styles.mainTitle}>условия для участия</div>
            
              <div className={styles.textBlock}>
                <div className={styles.topBlock}>
                  <div className={styles.titleBlock}>
                    <div className={styles.checkImg}>
                      <RadioButtonUncheckedIcon />
                    </div>
                    <p className={styles.title}>
                      Зарегистрироваться
                    </p>
                  </div>
                  <div className={styles.titleBlock}>
                    <div className={styles.checkImg}>
                      <RadioButtonUncheckedIcon />
                    </div>
                    <p className={styles.title}>
                      Выложить минимум 5 своих работ
                    </p>
                  </div>
                  <div className={styles.titleBlock}>
                    <div className={styles.checkImg}>
                      <RadioButtonUncheckedIcon />
                    </div>
                    <p className={styles.title}>
                     Победить
                    </p>
                  </div>
                </div>
                <div className={styles.priceBlock}>
                 
                  <a onClick={() => handleClose()}>Закрыть</a>
                </div>
              </div>
            
          </div>
        </DialogContent>
      </Dialog>
    );
}

export default ContestModalWindow