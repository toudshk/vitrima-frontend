"use client";
import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/screens/application-form/ApllicationForm";
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
