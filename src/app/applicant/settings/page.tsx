"use client";
import SettingsProfileApplicant from "@/components/screens/profile/applicant-profile/settings-profile-applicant/SettingsProfileApplicant";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { redirect, useRouter } from "next/navigation";

const Page: NextPageAuth = () => {
  const { user } = useAuth();
 
  if (!user) {
    redirect("/");
  }
  

  return <SettingsProfileApplicant />;
};

export default Page;
