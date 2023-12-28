import "../styles/globals.css";
import seoConfig from "../config/next-seo";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { ThemeContextProvider } from "../contexts/theme";
import { DefaultSeo } from "next-seo";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useRouter } from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
  });
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log(
        `%cGreetings fellow dev 👻`,
        "background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);font-size: 2rem;"
      );
    }
  }, []);

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <DefaultSeo {...seoConfig} />
      <ThemeContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </ThemeContextProvider>
    </PostHogProvider>
  );
}

export default MyApp;
