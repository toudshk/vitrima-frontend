"use client";
import clsx from "clsx";
import { forwardRef } from "react";

import { IField } from "./form.interface";

import styles from "./Form.module.scss";

const Field = forwardRef<HTMLInputElement, IField>(
  ({ title, placeholder, error, type = "text", style, ...rest }, ref) => {
    return (
      <>
        <p className="text-xl mb-4">{title}</p>

        <div className={clsx(styles.common, styles.field)} style={style}>
          
          <input ref={ref} type={type} {...rest} placeholder={placeholder} />
          {error && <div className={styles.error}>{error.message}</div>}
        </div>
      </>
    );
  }
);

Field.displayName = "Field";

export default Field;
