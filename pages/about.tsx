import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";

const About = () => {
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
            <p className="text-center font-mono text-xs leading-6 text-dimmed duration-200 hover:text-white md:text-sm">
              I am a fullstack developer that has been working professionally
              for half a decade. In that period, {`I've`} had the opportunity to
              successfully design, build and deliver applications at enterprise
              scale. I have also been fortunate to be able to lead development
              teams in the later part of my career.
              <br />
              <br />
              Passionate in taking on ambitious projects with diverse teams, and
              in the overall software development spectrum.
              <br />
              <br />
              Also an audio engineer, music producer & artist under the alias
              {` "kyi"`}. My work is available on most streaming platforms.
            </p>
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
