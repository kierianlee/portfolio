import Head from "next/head";
import { ReactElement } from "react";
import AnimatedK from "../components/animated-k";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps } from "next";
import { sanity } from "../lib/sanity";
import { Home as HomeType } from "../types/home";
import { Social } from "../types/social";
import { socialIcons } from "./utils/social";
import { NextPageWithLayout } from "./_app";

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
  return (
    <>
      <Head>
        <title>Kierian - Home</title>
      </Head>
      <div className="min-h-full px-12">
        <div className="h-screen">
          <div className="-mt-6 flex h-full flex-col items-center justify-center">
            <AnimatedK />
            <WithCodeTags tag="h1" className="mt-12">
              <h1
                className="intro-title text-3xl md:text-5xl"
                data-text={data.home.title}
              >
                {data.home.title}
              </h1>
            </WithCodeTags>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
