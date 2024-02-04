
import Image from "next/image";
import { FC, useState } from "react";
import imageBg from "../../components/common/images/ui/authPage/AuthBg.png";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import styles from "./page.module.scss";
import SignUpForms from "@/components/shared/user/SignUpForms";

const SignupLayout: FC = () => {


  
  return (
    <section className={styles.container}>
      <div className={styles.leftBlock}>
       
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
