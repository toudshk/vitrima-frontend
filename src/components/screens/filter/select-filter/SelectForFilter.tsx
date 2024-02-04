import { FC, useEffect, useState } from "react";
import ReactSelect, { ActionMeta } from "react-select";
import ValueType from "react-select";
import makeAnimated from "react-select/animated";
import infoIconSvg from "@/app/assets/images/info.svg";
import { isMobile } from "react-device-detect";

import styles from "./SelectForFilter.module.scss";
import { IOption, ISelect } from "./SelectForFilter.interface";
import Image from "next/image";

const animatedComponents = makeAnimated();
const customStyles = {
  control: (provided, state) => ({
    ...provided,

    backgroundColor: "#EAEAEA",
    border: "1px solid #ABABAB",
    borderRadius: "0.8vw",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: isMobile ? "12px" : "24px", // Adjust the font size as needed
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: isMobile ? "12px" : "24px", // Размер шрифта для плейсхолдера
  }),
  multiValue: (provided) => ({
    ...provided,
    fontSize: isMobile ? "12px" : "24px", // Adjust the font size for the multi-value container
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontSize: isMobile ? "12px" : "24px", // Adjust the font size for the label within the multi-value container
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    fontSize: isMobile ? "12px" : "24px", // Adjust the font size for the remove button within the multi-value container
  }),

  // Add more styles for other components as needed
};
const DynamicSelect: FC<ISelect> = ({
  placeholder,
  error,
  isMulti,
  options,
  field,
  onSelectChange,
  setCurrentSubType,
}) => {
  const onChange = (
    newValue: ValueType<IOption, boolean>,
    { action }: ActionMeta<IOption>
  ) => {
    if (action !== "input-change") {
      field.onChange(
        isMulti
          ? (newValue as IOption[]).map((item: IOption) => item.value)
          : (newValue as IOption).value
      );
      onSelectChange && onSelectChange(newValue); // Вызов нового prop при изменении
    }
  };

  const getValue = () => {
    if (field.value) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  const handleMouseEnter = (label, description, image) => {
    setCurrentSubType({ label, description, image });
  };

  const handleMouseLeave = () => {
    setCurrentSubType(null);
  };

  

  const formatOptionLabel = ({ label, description, image }) => (
    <div className={styles.itemBlock}>
      <div className="mr-auto ">{label}</div>
      <button
      className={styles.infoButton}
        onMouseEnter={() => handleMouseEnter(label, description, image)}
        onMouseLeave={handleMouseLeave}
      >
        <Image src={infoIconSvg} width={20} height={20} alt="" />
      </button>
    </div>
  );

  return (
    <div className={styles.selectContainer}>
      <label>
        <span>{placeholder}</span>
        <ReactSelect
          classNamePrefix="custom-select"
          placeholder={"Выберите стиль"}
          formatOptionLabel={formatOptionLabel}
          options={options}
          value={getValue()}
          onChange={onChange}
          isMulti={isMulti}
          components={animatedComponents}
          styles={customStyles}
        />
      </label>
      {error && <div>Ничего не найдено</div>}
    </div>
  );
};

export default DynamicSelect;
