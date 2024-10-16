import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/screens/application-form/ApllicationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Найдем за вас лучшего дизайнера",
  description: "Заполните данные и мы вам напишем с лучшими предложениями.",
}

const Page: NextPageAuth = () => {
 

  return (
    <>
      <div >
       <ApplicationForm/>
      </div>
    </>
  );
};

export default Page;
