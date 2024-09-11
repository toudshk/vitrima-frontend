"use client";
import React, { FC, useState } from "react";
import styles from "./page.module.scss";

import PdfViewer from "@/components/ui/Pdf-viewer/PdfViewer";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface IModalWindow {
  open: any;
  pdfUrl: string;
  handleClose: any;

  scroll: any;
}
export const SimpleDialog: FC<IModalWindow> = ({
  open,
  pdfUrl,
  handleClose,

  scroll,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      scroll={scroll}
      disableScrollLock
    >
      <DialogContent dividers={scroll === "body"} sx={{ padding: "0px" }}>
        <PdfViewer pdfUrl={pdfUrl} />
      </DialogContent>
    </Dialog>
  );
};

export default function DocumentPage() {
  const [open, setOpen] = React.useState(false);

  const data = [
    {
      title: "Согласие на обработку персональных данных",
      url: "Согласие на обработку персональных данных.pdf",
    },
    {
      title: "Условия использования платформы",
      url: "Условия использования платформы.pdf",
    },
    {
      title: "Договор оферты для подрядчиков",
      url: "Договор оферты для подрядчиков.pdf"
    },
    {
      title: "Пользовательское соглашение для соискателей",
      url: "Пользовательское соглашение для соискателей.pdf"
    },
    {
      title: "Политика конфиденциальности",
      url: "Политика конфиденциальности.pdf"
    }
    
  ];
  const [workData, setWorkData] = useState<
    { title: string; url: string } | undefined
  >();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };
  const handleWorkData = (value: any) => {
    setWorkData(value);
    setOpen(true);
  };

  const [scroll, setScroll] = useState("body");

  return (
    <div className={styles.container}>
      <h1>Перечень документов</h1>
      <div className={styles.items}>
        {data.map((item) => (
          <button
          className={styles.button}
            key={item.title}
            onClick={(e) => {
              handleWorkData(item);
              handleClickOpen();
            }}
          >
            {item.title}
          </button>
        ))}

        <SimpleDialog
          open={open}
          pdfUrl={workData ? workData.url : ""}
          scroll={scroll}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}
