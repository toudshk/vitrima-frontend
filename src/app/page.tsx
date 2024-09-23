import dynamic from "next/dynamic";
import Head from "next/head";

const DynamicFirstPage = dynamic(
  () => import("../components/screens/first-page/FirstPage/FirstPage"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Head>
        <meta name="yandex-verification" content="dce0d86be52c6f27" />
      </Head>
      <DynamicFirstPage />
    </>
  );
}
