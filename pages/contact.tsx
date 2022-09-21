import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
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
            <p className="text-center font-mono text-sm text-dimmed duration-200 hover:text-white">
              You can reach me at{" "}
              <a href="mailto:hey@kierian.me" className="text-crayola">
                hey@kierian.me
              </a>
              .
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <a
                href="https://github.com/kierien"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-2xl md:text-3xl"
                />
              </a>
              <a
                href="https://my.linkedin.com/in/kierian"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-2xl md:text-3xl"
                />
              </a>
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
