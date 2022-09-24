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
import PageTitle from "../components/page-title";

const projectsQuery = `*[_type == "project"] { 
  _id,
  image,
  tags,
  name,
  slug
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
      <div className="flex h-full flex-col items-center px-8 pt-16 pb-32">
        <WithCodeTags tag="h1" className="mt-12">
          <PageTitle title="Work" />
        </WithCodeTags>
        <div className="container mx-auto mt-16">
          <div className="grid gap-16 md:grid-cols-2 xl:grid-cols-3">
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
  project: { image, name, tags, slug },
}: {
  project: Project;
}) => {
  const imageProps = useNextSanityImage(sanity, image);

  return (
    <Link href={`/work/${slug.current}`} passHref>
      <a className="isolated relative h-[300px]">
        <Image
          blurDataURL={imageProps.blurDataURL}
          src={imageProps.src}
          loader={imageProps.loader}
          priority
          alt={name}
          layout="fill"
          className="object-cover"
        />
        <div className="absolute bottom-0 z-20 flex w-full items-center justify-between bg-[rgba(0,0,0,0.6)] p-2">
          <div className="font-mono text-sm text-white">{name}</div>
          <div className="flex items-center gap-2 xl:gap-3">
            {tags.map((item: string, index: number) => (
              <div
                className="rounded bg-[rgba(0,0,0,0.8)] py-1 px-1 font-mono text-[10px] text-white xl:text-xs"
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
