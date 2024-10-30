"use client";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import Popup from "../pop-up/PopUp";
import concept from '../../../common/images/ui/formPage/concept.png'
import fullProject from '@/components/common/images/ui/formPage/full-project.png'
import visual from '@/components/common/images/ui/formPage/visual.jpg'
const DynamicSelectForStubType = dynamic(
  () => import("@/components/screens/filter/select-filter/SelectForFilter")
);

const data = [
  { value: "Концепция", label: "Концепция", image: concept.src,
     description: "Концепция - это воплощение внешнего образа интерьера в целом, показанного либо на коллажах, либо на визуализациях без рабочих чертежей и комплектации." },
  { value: "Визуализация", label: "Визуализация", image: fullProject.src,
     description: "Визуализации - это создание объемных и фотореалистичных изображений, на основе либо полного проекта, либо концепции." },
  { value: "Полный проект", label: "Полный проект", image: visual.src,
     description: "Полный проект - это разработка всех рабочих чертежей и комплектации в сопровождении с визуализациями." },
];

const FormatInput: FC<{ control: any }> = ({ control }) => {
  const [currentFormat, setCurrentFormat] = useState(null);
  const handleSubTypesChange = (selectedValue: any) => {
    setCurrentFormat(selectedValue);
  };
  return (
    <>
      <Controller
        name="format"
        rules={{
            required: "Заполните поле",
          }}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DynamicSelectForStubType
            error={error}
            title={"формат"}
            field={field}
            options={data}
            
            onSelectChange={handleSubTypesChange}
            setCurrentSubType={setCurrentFormat}
          />
        )}
      />
      <Popup isSubTypeLoading={false} currentSubType={currentFormat} />
    </>
  );
};
export default FormatInput;
