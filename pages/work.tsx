import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { sanity } from "../lib/sanity";
import { Project } from "../types/project";
import PageTitle from "../components/page-title";
import { motion } from "framer-motion";
import SanityImage from "../components/sanity-image";
import { NextSeo } from "next-seo";

const projectsQuery = `*[_type == "project"] | order(_createdAt desc) { 
  _id,
  image {
    asset->{
      ...,
      metadata
    }
  },
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

const containerAnimationVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childAnimationVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Work = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title="Kierian - Work"
        description="A collection of my recent work"
        openGraph={{
          url: "https://kierian.me/work",
          title: "Kierian - Work",
          description: "A collection of my recent work",
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
      <div className="flex h-full flex-col items-center px-8 pt-16 pb-32">
        <WithCodeTags tag="h1" className="mt-12">
          <PageTitle title="Work" />
        </WithCodeTags>
        <div className="container mx-auto mt-16">
          <motion.div
            className="grid gap-16 md:grid-cols-2 xl:grid-cols-3"
            variants={containerAnimationVariants}
            initial="hidden"
            animate="show"
          >
            {projects.map((project: Project, index: number) => (
              <ProjectCard project={project} key={index} />
            ))}
          </motion.div>
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
  return (
    <Link
      href={`/work/${slug.current}`}
      className="isolated relative h-[300px]"
    >
      <motion.div variants={childAnimationVariants}>
        <div className="[&>img]:object-cover">
          <SanityImage alt={name} fill sanityImage={image.asset} />
        </div>
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
      </motion.div>
    </Link>
  );
};

export default Work;

Work.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
