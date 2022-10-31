import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ReactElement } from "react";
import Layout from "../../components/layout/layout";
import WithCodeTags from "../../components/with-code-tag";
import { sanity } from "../../lib/sanity";
import { Project } from "../../types/project";
import ArticlePortableText from "../../components/article-portable-text";
import SanityImage from "../../components/sanity-image";
import { NextSeo } from "next-seo";
import { useNextSanityImage } from "next-sanity-image";

const Work = ({ project }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageProps = useNextSanityImage(sanity, project.image);

  return (
    <>
      <NextSeo
        title={`Kierian - ${project.name}`}
        description={project.name}
        openGraph={{
          url: `https://kierian.me/work/${project.slug.current}`,
          title: `Kierian - ${project.name}`,
          description: project.name,
          images: [
            {
              url: imageProps.src,
              alt: "Kierian",
              type: "image/jpeg",
            },
          ],
          siteName: "Kierian",
        }}
      />
      <div className="flex h-full flex-col items-center px-8 pt-16 pb-32">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="my-4 text-3xl font-semibold">{project.name}</h1>
        </WithCodeTags>
        <div className="mx-auto mt-12 w-full max-w-2xl">
          <div className="relative h-48 sm:h-[300px] md:h-[400px] [&>img]:object-cover">
            <SanityImage src={project.image} fill alt={project.name} />
          </div>
          <WithCodeTags tag="article" className="mt-16">
            <ArticlePortableText value={project.description} />
          </WithCodeTags>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanity.fetch(
    `*[_type == "project" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ project: Project }> = async ({
  params,
}) => {
  const project = await sanity.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    {
      slug: params?.slug || "",
    }
  );

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
