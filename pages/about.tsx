import { GetStaticProps } from "next";
import { ReactElement, useContext, useMemo } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { sanity } from "../lib/sanity";
import { About as AboutType } from "../types/about";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import PageTitle from "../components/page-title";
import { NextSeo } from "next-seo";
import ThemeContext from "../contexts/theme";

const aboutQuery = `*[_type == "about"][0] { 
  _id,
  content
}`;

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanity.fetch(aboutQuery);

  return {
    props: {
      data,
    },
  };
};

const About = ({ data }: { data: AboutType }) => {
  const theme = useContext(ThemeContext);

  const technologies = useMemo(
    () => [
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/nextjs.svg"
        className={`h-10 ${
          theme.darkMode ? "invert" : "invert-0"
        } opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
        key="next"
        alt="Next.js"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/react.svg"
        className="h-10 opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        key="react"
        alt="React"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/graphql.svg"
        className="h-10 opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        key="graphql"
        alt="GraphQL"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/typescript.svg"
        className="h-10 opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        key="typescript"
        alt="TypeScript"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/pothos.svg"
        className={`h-7 ${
          theme.darkMode ? "invert-0" : "invert"
        } opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
        key="pothos"
        alt="Pothos"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/trpc.svg"
        className="h-10 opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        key="trpc"
        alt="tRPC"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/prisma.svg"
        className={`h-8 ${
          theme.darkMode ? "invert" : "invert-0"
        } opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
        key="prisma"
        alt="Prisma"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/planetscale.svg"
        className={`h-9 ${
          theme.darkMode ? "invert" : "invert-0"
        } opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
        key="planetscale"
        alt="planetscale"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/tailwind.svg"
        className={`h-5 ${
          theme.darkMode ? "invert" : "invert-0"
        } opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
        key="tailwind"
        alt="Tailwind"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/mantine.svg"
        className={`h-8 ${
          theme.darkMode ? "invert" : "invert-0"
        } opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 `}
        key="mantine"
        alt="Mantine"
      />,
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/technologies/vercel.svg"
        className={`h-6 ${
          theme.darkMode ? "invert" : "invert-0"
        } opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
        key="vercel"
        alt="Vercel"
      />,
    ],
    [theme]
  );

  return (
    <>
      <NextSeo
        title="Kierian - About"
        description="About myself"
        openGraph={{
          url: "https://kierian.me/about",
          title: "Kierian - About",
          description: "About myself",
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
      <div className="flex h-full flex-col items-center px-8 pt-16 pb-32">
        <WithCodeTags tag="h1" className="mt-12">
          <PageTitle title="About" />
        </WithCodeTags>
        <div className="mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0,
                duration: 1,
              },
            }}
          >
            <WithCodeTags tag="p" className="mt-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.1,
                    duration: 1,
                  },
                }}
                className="mb-12 flex justify-center"
              >
                <img
                  src="/avatar.jpeg"
                  alt="Kierian"
                  className="h-60 w-60 rounded-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 1,
                  },
                }}
              >
                <PortableText
                  value={data.content}
                  components={{
                    block: {
                      normal: ({ children }) =>
                        (children as string[])?.[0] ? (
                          <p className="text-center font-mono text-xs leading-6 text-muted duration-200 hover:text-black dark:text-dimmed dark:hover:text-white md:text-sm">
                            {children}
                          </p>
                        ) : (
                          <p className="whitespace-pre text-center font-mono text-sm text-xs leading-6 text-muted duration-200 before:content-['\a'] hover:text-black dark:text-dimmed dark:hover:text-white md:text-sm">
                            {children}
                          </p>
                        ),
                    },
                  }}
                />
              </motion.div>
            </WithCodeTags>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.6,
                duration: 1,
              },
            }}
            className="mt-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
          >
            {technologies.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
