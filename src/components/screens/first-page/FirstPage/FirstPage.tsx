// @ts-nocheck
"use client";
import React, { FC, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./FirstPage.module.scss";
import clsx from "clsx";
import Footer from "@/components/layout/footer/Footer";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useGallery } from "../../main-page/UseGallery";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import TimeUpload from "@/components/ui/masonry/timeUpload/TimeUpload";

import ContestModalWindow from "./contest-modal-window/ContestModalWindow";
import { useUser } from "../../profile/useUser";

import baseImage from "@/app/assets/images/base-avatar.jpg";
import ApplicationBlock from "../application-block/ApplicationBlock";
import OnboardCards from "../onboard-cards/OnboardCards";
import LocomotiveScroll from "locomotive-scroll";

import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Loader } from "@react-three/drei";
import Hero from "../hero-block/Hero";
import Header from "../header/Header";
import About from "../about/About";

const FirstPage: FC = () => {
  const { ref: refView, inView } = useInView();
  const { user } = useAuth();
  const { data: userData } = useUser(user?._id);

  const pathname = usePathname();

  useEffect(() => {
    let locomotiveScroll: LocomotiveScroll | null = null;

    if (pathname === "/") {
      const scrollContainer = document.querySelector(
        "[data-scroll-container]"
      ) as HTMLElement;

      if (scrollContainer) {
        locomotiveScroll = new LocomotiveScroll({
          el: scrollContainer,
          smooth: true,
        });
      }
    }

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, [pathname]);

  return (
    <>
      <Suspense fallback={null}>
        <div data-scroll-container>
          <Header />
          <div className="w-full  bg-gray-400 relative">
            <Hero />
          </div>
          <About />
          <OnboardCards />
          
            <ApplicationBlock />
          
          <Footer />
        </div>
      </Suspense>
      <Loader />
    </>
  );
};

export default FirstPage;
