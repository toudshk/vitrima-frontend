"use client";
import SettingsProfileApplicant from "@/components/screens/profile/applicant-profile/settings-profile-applicant/SettingsProfileApplicant";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const page: NextPageAuth = () => {
  

  return <SettingsProfileApplicant />;
};

export default page;
