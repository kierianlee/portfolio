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
      <div className="flex flex-col items-center h-full py-16">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="text-3xl font-semibold my-4">Contact</h1>
        </WithCodeTags>
        <WithCodeTags tag="p" className="mt-16">
          <div className="max-w-xl mx-auto">
            <p className="font-mono text-center text-sm text-dimmed hover:text-white duration-200">
              You can reach me at{" "}
              <a href="mailto:hey@kierian.me" className="text-crayola">
                hey@kierian.me
              </a>
              .
            </p>
            <div className="flex gap-4 justify-center mt-4">
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
