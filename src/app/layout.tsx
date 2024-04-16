import "./assets/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Favicon from "/public/icon.png";
import MainProvider from "@/components/providers/MainProvider/MainProvider";

const myFont = localFont({
  src: "./assets/fonts/Jura-VariableFont_wght.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Витрима",
  description: "Сервис возможностей",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={myFont.className}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
