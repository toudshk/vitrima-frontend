import MainButton from "@/components/ui/Button/MainButton";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";

const ApplicationTableItem: FC<any> = ({ tableItem, removeHandler }) => {
  console.log(tableItem)
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col gap-2 mb-2">
      <p>Почта пользователя: {tableItem?.applicantId?.email}</p>
       <p>Дата обращения: {convertMongoDate(tableItem.createdAt)}</p>

      </div>

      
      <div className="mt-4">
        
          <Link href={`/project/${tableItem._id}`} className='font-bold border border-gray-700 p-2 rounded-2xl'>Открыть проект</Link>
          </div>
      
      </div>
  
  );
};

export default ApplicationTableItem;
