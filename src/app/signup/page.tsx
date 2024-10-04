
import Image from "next/image";
import { FC, useState } from "react";
import imageBg from "../../components/common/images/ui/authPage/AuthBg.png";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import styles from "./page.module.scss";
import SignUpForms from "@/components/shared/user/SignUpForms";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SignupLayout: FC = () => {


  
  return (
    <section className={styles.container}>
      <div className={styles.leftBlock}>
      <Link
          href={"/"}
          className="text-white bg-gray-300 bg-opacity-50 rounded-2xl px-2 py-1 ml-auto  mt-4 mr-5 h-8 hover:bg-opacity-70"
        >
          На главную
          <ArrowForwardIcon fontSize='16px'/>
        </Link>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.logotype}>
          <MainLogoBlack width={595} />
        </div>
        <SignUpForms      />
        
      </div>
    </section>
  );
};
export default SignupLayout;
