import "./assets/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Favicon from "/favicon.ico";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainProvider from "@/components/providers/MainProvider/MainProvider";

const myFont = localFont({
  src: "./assets/fonts/Montserrat-VariableFont_wght.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Витрима",
  description: "Индивидуальный подбор дизайнеров интерьеров и архитектуры",
  keywords: [
    "дизайнер интерьеров",
    "услуги дизайнера",
    "интерьер мск",
    "интерьер спб",
    "дизайнер архитектуры",
    "услуги архитектора",
    "найти дизайнера интерьера",
    "найти дизайнера архитектуры",
    "дизайнеры интерьеров спб",
    "дизайнеры архитектуры спб",
    "дизайнеры интерьеров мск",
    "дизайнеры архитектуры мск",
    "дизайнеры интерьеров мск",
    "дизайнеры интерьеров спб",
    "дизайнеры архитектуры мск",
    "архитектор интерьеров",
    "витрима",
    "витрина",
    "услуги дизайнера",
    "интерьер",
    "архитектура",
    "поиск дизайнера интерьера",
    "поиск дизайнра архитектуры"

  ],
  icons: [{ rel: "icon", url: Favicon.src }],
  verification: {
    yandex: "dce0d86be52c6f27",
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
