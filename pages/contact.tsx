import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps } from "next";
import { sanity } from "../lib/sanity";
import { NextPageWithLayout } from "./_app";
import { Contact as ContactType } from "../types/contact";
import { Social } from "../types/social";
import { socialIcons } from "../utils/social";
import { PortableText } from "@portabletext/react";

const contactQuery = `
{
  'contact': *[_type == "contact"][0],
  'socials': *[_type == "social"],
}`;

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanity.fetch(contactQuery);

  return {
    props: {
      data,
    },
  };
};

const Contact: NextPageWithLayout<{
  data: { contact: ContactType; socials: Social[] };
}> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Kierian - Contact</title>
      </Head>
      <div className="flex h-full flex-col items-center py-16">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="my-4 text-3xl font-semibold">Contact</h1>
        </WithCodeTags>
        <WithCodeTags tag="p" className="mt-16">
          <div className="mx-auto max-w-xl">
            <PortableText
              value={data.contact.content}
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
                marks: {
                  link: ({ children }) => (
                    <a
                      href="mailto:hey@kierian.me"
                      className="text-blue-500 dark:text-crayola"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
            <div className="mt-4 flex justify-center gap-4">
              {data.socials.map((item, index) => (
                <a key={index} href={item.url} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon
                    icon={socialIcons.find((i) => i.type === item.type)!.icon}
                    className="text-2xl md:text-3xl"
                  />
                </a>
              ))}
            </div>
          </div>
        </WithCodeTags>
      </div>
    </>
  );
};

export default Contact;

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
