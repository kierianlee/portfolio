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
      <div className="flex flex-col items-center h-full py-16">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="text-3xl font-semibold my-4">About</h1>
        </WithCodeTags>
        <WithCodeTags tag="p" className="mt-16">
          <div className="max-w-xl mx-auto">
            <p className="font-mono text-center text-sm text-dimmed hover:text-white duration-200">
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
          </div>
        </WithCodeTags>
      </div>
    </>
  );
};

export default About;

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
