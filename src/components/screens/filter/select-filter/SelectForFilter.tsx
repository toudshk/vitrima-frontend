"use client"
import { FC, useEffect, useState } from "react";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import infoIconSvg from "@/app/assets/images/info.svg";
import { isMobile } from "react-device-detect";

import { usePathname } from 'next/navigation'
import styles from "./SelectForFilter.module.scss";
import { IOption, ISelect } from "./SelectForFilter.interface";
import Image from "next/image";
import { ISubType } from "@/components/shared/types/work.types";

import { useMediaQuery } from '@mui/material';
const animatedComponents = makeAnimated();
const getCustomStyles = (pathname: string) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: pathname === '/form' ? '#FFFFFF' : (isMobile ? "#FFFFFF" : "#EAEAEA"),
    border: "1px solid #ABABAB",
    borderRadius: "12px",
  }),
  option: (provided: any, state: any) => ({
    ...provided, 
    fontSize: pathname === '/form' ? '16px' : (isMobile ? "12px" : "24px"), // Adjust the font size as needed
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    fontSize: pathname === '/form' ? '12px' : (isMobile ? "12px" : "24px"), // Размер шрифта для плейсхолдера
  }),
  multiValue: (provided: any) => ({
    ...provided,
    fontSize: pathname === '/form' ? '12px' : (isMobile ? "12px" : "24px"), // Adjust the font size for the multi-value container
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    fontSize: pathname === '/form' ? '12px' : (isMobile ? "12px" : "24px"), // Adjust the font size for the label within the multi-value container
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    fontSize: pathname === '/form' ? '12px' : (isMobile ? "12px" : "24px"), // Adjust the font size for the remove button within the multi-value container
  }),


});


const DynamicSelect: FC<ISelect> = ({
  placeholder,
  error,
  isMulti,
  options,
  field,
  onSelectChange,
  setCurrentSubType,
  title
}) => {
  const onChange = (
    newValue: IOption | IOption[],
    { action }: any
  ) => {
    if (action !== "input-change") {
      field.onChange(
        isMulti
          ? (newValue as IOption[]).map((item: IOption) => item.value)
          : (newValue as IOption).value
      );
      if (onSelectChange) {
        onSelectChange(newValue);
      } // Вызов нового prop при изменении
    }
  };


  const pathname = usePathname()
  const getValue = () => {
    if (field.value) {
      return isMulti
        ? options.filter((option: { value: any; }) => field.value.indexOf(option.value) >= 0)
        : options.find((option: { value: any; }) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  const handleMouseEnter = (label: any, description: any, image: any) => {
    setCurrentSubType({ label, description, image });
  };

  const handleMouseLeave = () => {
    setCurrentSubType(null);
  };

  

  const formatOptionLabel = ({ label, description, image }: ISubType) => (
    <div className={styles.itemBlock}>
      <div className="mr-auto ">{label}</div>
      
      {(title === 'стиль' && !isMobile) && (
        <button
        type="button"
          className={styles.infoButton}
          onMouseEnter={() => handleMouseEnter(label, description, image)}
          onMouseLeave={handleMouseLeave}
        >
          <Image src={infoIconSvg} width={20} height={20} alt="" />
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.selectContainer}>
      <label>
        <span>{placeholder}</span>
        <ReactSelect
          classNamePrefix="custom-select"
          placeholder={`Выберите ${title}`}
          formatOptionLabel={formatOptionLabel}
          options={options}
          value={getValue()}
          onChange={onChange}
          isMulti={isMulti}
          components={animatedComponents}
          styles={getCustomStyles(pathname)}
        />
      </label>
      {error && <div>Ничего не найдено</div>}
    </div>
  );
};

export default DynamicSelect;
