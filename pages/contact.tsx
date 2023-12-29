import { ReactElement, useContext } from "react";
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
import PageTitle from "../components/page-title";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import ThemeContext from "../contexts/theme";

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
  const theme = useContext(ThemeContext);

  return (
    <>
      <NextSeo
        title="Kierian - Contact"
        description="Get in touch"
        openGraph={{
          url: "https://kierian.me/contact",
          title: "Kierian - Blog",
          description: "Get in touch",
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
      <div className="flex h-full flex-col items-center py-16">
        <WithCodeTags tag="h1" className="mt-12">
          <PageTitle title="Contact" />
        </WithCodeTags>
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
                        <p className="whitespace-pre text-center font-mono text-xs leading-6 text-muted duration-200 before:content-['\a'] hover:text-black dark:text-dimmed dark:hover:text-white md:text-sm">
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
            </div>
          </WithCodeTags>

          <div className="my-10 text-center font-mono text-xs text-muted dark:text-dimmed">
            or through this form
          </div>

          <WithCodeTags tag="form">
            <form
              className="flex w-full flex-col gap-4 font-mono text-xs sm:min-w-[400px] md:text-sm"
              action="https://formie.dev/form/29d98e3f-be19-4021-9f31-6f5cc1e25e0a"
              method="POST"
            >
              <input
                className="w-full border py-1 px-2 dark:border-neutral-700 dark:bg-neutral-900 dark:placeholder:text-dimmed/40"
                placeholder="Name"
                name="name"
              />
              <textarea
                className="w-full resize-none border py-1 px-2 dark:border-neutral-700 dark:bg-neutral-900 dark:placeholder:text-dimmed/40"
                placeholder="Message"
                name="message"
              />
              <button className="w-full border bg-white py-1 px-2 dark:border-neutral-700 dark:bg-neutral-900">
                Submit
              </button>
              <a
                href="https://formie.dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-end gap-2 text-xs"
              >
                Powered by{" "}
                <img
                  src={
                    theme.darkMode
                      ? "https://formie.dev/logo-dark.svg"
                      : "https://formie.dev/logo-light.svg"
                  }
                  className="h-3 "
                />
              </a>
            </form>
          </WithCodeTags>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
