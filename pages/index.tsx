import Head from "next/head";
import { ReactElement } from "react";
import AnimatedK from "../components/animated-k";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  return (
    <>
      <Head>
        <title>Kierian - Home</title>
      </Head>
      <div className="min-h-full px-12">
        <div className="h-screen">
          <div className="flex flex-col items-center justify-center h-full -mt-6">
            <AnimatedK />
            <WithCodeTags tag="h1" className="mt-12">
              <h1
                className="intro-title"
                data-text="Hi, I'm Kierian, fullstack developer."
              >
                Hi, {`I'm`} Kierian, fullstack developer.
              </h1>
            </WithCodeTags>
            <WithCodeTags tag="p" className="">
              <p className="block text-center font-mono text-sm text-dimmed max-w-md hover:text-white duration-200">
                I specialize in creating, designing, developing and deploying
                software systems at scale.
              </p>
              <div className="flex gap-4 justify-center mt-4">
                <a
                  href="https://github.com/kierien"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                  href="https://my.linkedin.com/in/kierian"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
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
