import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../../components/layout/layout";
import WithCodeTags from "../../components/with-code-tag";
import { sanity } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { Project } from "../../types/project";

const Work = ({ project }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageProps = useNextSanityImage(sanity, project.image);

  return (
    <>
      <Head>
        <title>{`Kierian - ${project.name}`}</title>
      </Head>
      <div className="flex flex-col items-center h-full pt-16 pb-32 px-8">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="text-3xl font-semibold my-4">{project.name}</h1>
        </WithCodeTags>
        <div className="max-w-2xl mx-auto mt-12">
          <div className="relative h-48 sm:h-[300px] md:h-[400px]">
            <Image
              {...imageProps}
              alt={project.name}
              className="object-cover"
              layout="fill"
            />
          </div>
          <WithCodeTags tag="article" className="mt-16">
            <PortableText
              value={project.description}
              components={{
                block: {
                  normal: ({ children }) =>
                    (children as string[])?.[0] ? (
                      <p className="font-light text-sm md:text-base">
                        {children}
                      </p>
                    ) : (
                      <p className="before:content-['\a'] whitespace-pre text-sm md:text-base">
                        {children}
                      </p>
                    ),
                },
                list: {
                  number: ({ children }) => (
                    <ol className="list-decimal ml-10 text-sm md:text-base font-light">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          </WithCodeTags>
        </div>
      </div>
    </>
  );
};

const projectsQuery = `*[_type == "project"] { _id }`;

const singleProjectQuery = `*[_type == "project" && _id == $id] {
  _id,
  name,
  image,
  description
}[0]
`;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const projects = await sanity.fetch(projectsQuery);
  const paths = projects.map((project: { _id: string }) => ({
    params: { id: project._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ project: Project }> = async ({
  params,
}) => {
  // It's important to default the slug so that it doesn't return "undefined"
  const project = await sanity.fetch(singleProjectQuery, { id: params?.id });

  return {
    props: {
      project,
    },
  };
};

export default Work;

Work.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
