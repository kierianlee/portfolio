import "../styles/globals.css";
import seoConfig from "../config/next-seo";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { ThemeContextProvider } from "../contexts/theme";
import { DefaultSeo } from "next-seo";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log(
        `%cGreetings fellow dev 👻`,
        "background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);font-size: 2rem;"
      );
    }
  }, []);

  return (
    <>
      <DefaultSeo {...seoConfig} />
      <ThemeContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </ThemeContextProvider>
    </>
  );
}

export default MyApp;
