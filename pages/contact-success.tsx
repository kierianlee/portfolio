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

const contactQuery = `
{
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

const ContactSuccess: NextPageWithLayout<{
  data: { contact: ContactType; socials: Social[] };
}> = ({ data }) => {
  return (
    <>
      <div className="flex h-full flex-col items-center py-16">
        <WithCodeTags tag="h1" className="mt-12">
          <PageTitle title="Message Sent" />
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
              <p className="text-center font-mono text-xs leading-6 text-muted duration-200 hover:text-black dark:text-dimmed dark:hover:text-white md:text-sm">
                Thank you for reaching out, {`I'll`} be in touch promptly!
                Alternatively, you can also reach me using the socials below.
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
            </div>
          </WithCodeTags>
        </motion.div>
      </div>
    </>
  );
};

export default ContactSuccess;

ContactSuccess.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
