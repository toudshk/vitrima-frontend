import "./assets/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Favicon from "/favicon.ico";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainProvider from "@/components/providers/MainProvider/MainProvider";
import Head from "next/head";

const myFont = localFont({
  src: "./assets/fonts/Jura-VariableFont_wght.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Витрима",
  description: "Индивидуальный подбор дизайнеров интерьеров и архитектуры",

  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="yandex-verification" content="dce0d86be52c6f27" />
      </Head>
      <body className={myFont.className}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
