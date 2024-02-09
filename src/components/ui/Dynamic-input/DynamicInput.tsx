"use client";
import React, { ChangeEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './DynamicInput.module.scss'; // Подключите ваши стили

interface DynamicInputProps {
    title?: string;
  placeholder: string;
  error?: { message: string };
  type?: string;
  style?: React.CSSProperties;
  value?: string; // Add this line
  onChange?: (value: string) => void 
  newValue?:any
  inputValue?: string
  setInputValue?: any
  inputRef?: any
  }
  const DynamicInput: React.ForwardRefRenderFunction<HTMLTextAreaElement, DynamicInputProps> = (
    {inputValue, setInputValue, inputRef, title, placeholder, error, type = "text", style, onChange, ...rest},
    ref, 
  ) => {
  
    
    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);
      adjustTextareaHeight();
  
      // Call the onChange prop if provided
      if (onChange) {
        onChange(newValue);
      }
  
      // Check if the new value is empty, then reset the textarea height
      if (inputRef.current && !newValue.trim()) {
        inputRef.current.style.height = 'auto';
      }
    };
  
    const adjustTextareaHeight = () => {
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
      }
    };
  
    return (
      <div className={clsx(styles.common, styles.field)} style={style}>
        <textarea
          className={styles.textArea}
          ref={inputRef}
          {...rest}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    );
  };
  
  export default DynamicInput;