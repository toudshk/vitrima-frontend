import "./assets/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Favicon from "/public/images/Metadata/favicon.ico";

import MainProvider from "@/components/providers/MainProvider/MainProvider";

const myFont = localFont({
  src: "./assets/fonts/Jura-VariableFont_wght.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitrima",
  description: "Сервис возможностей",
  icons: {
    icon: [
      {
        media: "(preference-color-scheme: light)",
        rel: "/images/Metadata/faviconBlack.ico",
        url: "/images/Metadata/faviconBlack.ico",
      },
      {
        media: "(preference-color-scheme: dark)",
        rel: "/images/Metadata/faviconWhite.ico",
        url: "/images/Metadata/faviconWhite.ico",
      },
    ],
  },
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
