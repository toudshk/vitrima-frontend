import "./assets/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import FaviconBlack from "/public/images/Metadata/faviconBlack.ico";
import FaviconWhite from "/public/images/Metadata/faviconWhite.ico";

import MainProvider from "@/components/providers/MainProvider/MainProvider";

const myFont = localFont({
  src: "./assets/fonts/Jura-VariableFont_wght.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Витрима",
  description: "Сервис возможностей",
  
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: FaviconBlack.src,
        media: '(prefers-color-scheme: light)',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: FaviconWhite.src,
          media: '(prefers-color-scheme: dark)',
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
