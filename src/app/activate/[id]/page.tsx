"use client";
import { UserService } from "@/services/user/user.service";
import { usePathname } from "next/navigation";
import React from "react";
import styles from './page.module.scss';
const ActivateProfile = () => {
  const pathname = usePathname();
  const code = pathname.split("/").pop();

  UserService.activate(code);
  return <div >Ваша почта подтверждена</div>;
};

export default ActivateProfile;
