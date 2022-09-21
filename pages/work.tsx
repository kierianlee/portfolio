import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { sanity } from "../lib/sanity";
import { useNextSanityImage } from "next-sanity-image";
import { Project } from "../types/project";

const projectsQuery = `*[_type == "project"] { 
  _id,
  image,
  tags,
  name
}`;

export const getStaticProps: GetStaticProps = async () => {
  const projects = await sanity.fetch(projectsQuery);

  return {
    props: {
      projects,
    },
  };
};

const Work = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Kierian - Work</title>
      </Head>
      <div className="flex flex-col items-center h-full py-16">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="text-3xl font-semibold my-4">Work</h1>
        </WithCodeTags>
        <div className="container mx-auto mt-16">
          <div className="grid grid-cols-3 gap-16">
            {projects.map((project: Project, index: number) => (
              <ProjectCard project={project} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ProjectCard = ({
  project: { _id, image, name, tags },
}: {
  project: Project;
}) => {
  const imageProps = useNextSanityImage(sanity, image);

  return (
    <Link href={`/work/${_id}`} passHref>
      <a className="isolated relative h-[300px]">
        <Image
          {...imageProps}
          alt={name}
          layout="fill"
          className="object-cover"
          placeholder="blur"
        />
        <div className="absolute bottom-0 z-20 bg-[rgba(0,0,0,0.6)] w-full p-2 flex justify-between items-center">
          <div className="font-mono text-sm">{name}</div>
          <div className="flex gap-4 items-center">
            {tags.map((item: string, index: number) => (
              <div
                className="text-xs rounded bg-[rgba(0,0,0,0.8)] text-white font-mono py-1 px-1"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Work;

Work.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
