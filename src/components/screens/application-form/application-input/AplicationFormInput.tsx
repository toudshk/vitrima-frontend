"use client";
import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./ApplicationFormInput.module.scss";
import { IField } from "@/components/ui/Form-elements/form.interface";

const ApplicationFormInput = forwardRef<HTMLInputElement, IField>(
  ({ title, placeholder, error, type = "text", style, ...rest }, ref) => {
    return (
      <>
        <p className={styles.subtitle}>{title}</p>

        <div className={styles.field} style={style}>
          <input ref={ref} type={type} {...rest} placeholder={placeholder} />
          {error && <div className={styles.error}>{error.message}</div>}
        </div>
      </>
    );
  }
);

ApplicationFormInput.displayName = "Field";

export default ApplicationFormInput;
