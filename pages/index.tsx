import { ReactElement, useContext, useEffect, useState } from "react";
import AnimatedK from "../components/animated-k";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps } from "next";
import { sanity } from "../lib/sanity";
import { Home as HomeType } from "../types/home";
import { Social } from "../types/social";
import { socialIcons } from "../utils/social";
import { NextPageWithLayout } from "./_app";
import { motion } from "framer-motion";
import ThemeContext from "../contexts/theme";
import { NextSeo } from "next-seo";

const homeQuery = `
{
  'home': *[_type == "home"][0],
  'socials': *[_type == "social"],
}`;

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanity.fetch(homeQuery);

  return {
    props: {
      data,
    },
  };
};

const Home: NextPageWithLayout<{
  data: { home: HomeType; socials: Social[] };
}> = ({ data }) => {
  const theme = useContext(ThemeContext);

  if (!theme.ready) {
    return (
      <>
        <NextSeo
          title="Kierian - Home"
          description={data.home.subtitle}
          openGraph={{
            url: "https://kierian.me",
            title: "Kierian - Home",
            description: data.home.subtitle,
            images: [
              {
                url: "https://kierian.me/site.jpg",
                width: 600,
                height: 600,
                alt: "Kierian",
                type: "image/jpeg",
              },
            ],
            siteName: "Kierian",
          }}
        />
      </>
    );
  }

  return (
    <>
      <NextSeo
        title="Kierian - Home"
        description={data.home.subtitle}
        openGraph={{
          url: "https://kierian.me",
          title: "Kierian - Home",
          description: data.home.subtitle,
          images: [
            {
              url: "https://kierian.me/site.jpg",
              width: 600,
              height: 600,
              alt: "Kierian",
              type: "image/jpeg",
            },
          ],
          siteName: "Kierian",
        }}
      />
      <div className="min-h-full px-12">
        <div className="-mt-6 flex h-full min-h-screen flex-col items-center justify-center">
          <motion.div
            initial={{
              transform: theme.dirty ? "translateY(15%)" : "translateY(30%)",
            }}
            animate={{
              transform: "translateY(0%)",
              transition: {
                delay: theme.dirty ? 0 : 1,
                duration: 2,
              },
            }}
          >
            <AnimatedK />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: theme.dirty ? 0 : 1.8,
                duration: 1,
              },
            }}
          >
            <WithCodeTags tag="h1" className="mt-12">
              <h1
                className="intro-title text-3xl md:text-5xl"
                data-text={data.home.title}
              >
                {data.home.title}
              </h1>
            </WithCodeTags>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: theme.dirty ? 0.5 : 2.3,
                duration: 1,
              },
            }}
          >
            <WithCodeTags tag="p" className="">
              <p className="block max-w-md text-center font-mono text-[12px] text-muted duration-200 hover:text-black dark:text-dimmed dark:hover:text-white sm:text-sm">
                {data.home.subtitle}
              </p>
              <div className="mt-4 flex justify-center gap-4">
                {data.socials.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={socialIcons.find((i) => i.type === item.type)!.icon}
                      className="text-2xl md:text-3xl"
                    />
                  </a>
                ))}
              </div>
            </WithCodeTags>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
