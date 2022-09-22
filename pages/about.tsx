import { GetStaticProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { sanity } from "../lib/sanity";
import { About as AboutType } from "../types/about";
import { PortableText } from "@portabletext/react";

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
  return (
    <>
      <Head>
        <title>Kierian - About</title>
      </Head>
      <div className="flex h-full flex-col items-center px-8 pt-16 pb-32">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="my-4 text-3xl font-semibold">About</h1>
        </WithCodeTags>
        <div className="mx-auto max-w-xl">
          <WithCodeTags tag="p" className="mt-16">
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
          </WithCodeTags>
        </div>
      </div>
    </>
  );
};

export default About;

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
