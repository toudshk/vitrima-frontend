import { FC } from "react";
import clsx from "clsx";
import styles from "./Message.module.scss";
import dayjs from "dayjs";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Image from "next/image"; // Используем Image для отображения изображений
import { IMessage } from "../Chat.types";

import { Document, Page } from "react-pdf";
import Link from "next/link";
export function Message({ message, own }: { message: IMessage; own: boolean }) {

  return (
    <div
      className={clsx([styles.message], {
        [styles.ownMessage]: own,
        [styles.friendMessage]: !own,
      })}
    >
      {/* Render images if available */}
      {message.images && message.images.length > 0 && (
        <div className={styles.imageContainer}>
          {message.images.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={image}
                alt={`Message Image ${index}`}
                width={500}
                height={500}
                objectFit="cover"
                className={styles.messageImage}
              />
            </div>
          ))}
        </div>
      )}

      {/* Render PDFs if available */}
      {message.drawings && message.drawings.length > 0 && (
        <div className={styles.pdfContainer}>
          {message.drawings.map((pdf, index) => (
            <div key={index} className={styles.pdfWrapper}>
              <Link
               href={pdf}
               target="_blank" 
               rel="noopener noreferrer" 
                className={styles.pdfDocument}
              >
              {pdf}
              </Link>
            
            </div>
          ))}
        </div>
      )}

      <div className={styles.messageTextBlock}>
        <p className={styles.messageText}>{message.text}</p>

        <div className={styles.messageBottom}>
          {dayjs(message.createdAt).format("HH:mm")}
          <div className={styles.checkMessage}>
            {own &&
              (message.status === "sent" ? (
                <DoneIcon />
              ) : message.status === "read" ? (
                <DoneAllIcon />
              ) : null)}
          </div>
        </div>
      </div>
    </div>
  );
};