import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../../components/layout/layout";
import WithCodeTags from "../../components/with-code-tag";
import { sanity } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import dayjs from "dayjs";
import { useNextSanityImage } from "next-sanity-image";
import { type Post as PostType } from "../../types/post";

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageProps = useNextSanityImage(sanity, post.image);

  return (
    <>
      <Head>
        <title>{`Kierian - ${post.title}`}</title>
      </Head>
      <div className="flex h-full flex-col items-center px-8 pt-16 pb-32">
        <WithCodeTags tag="h1" className="mt-12">
          <div className="my-4 text-center">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <small className="text-dimmed">
              {dayjs(post.date).format("DD MMM YYYY hh:mmA")}
            </small>
          </div>
        </WithCodeTags>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative h-48 sm:h-[300px] md:h-[400px]">
            <Image
              alt={post.title}
              layout="fill"
              blurDataURL={imageProps.blurDataURL}
              src={imageProps.src}
              loader={imageProps.loader}
              priority
            />
          </div>
          <WithCodeTags tag="article" className="mt-16">
            <PortableText
              value={post.content}
              components={{
                block: {
                  normal: ({ children }) =>
                    (children as string[])?.[0] ? (
                      <p className="text-sm font-light md:text-base">
                        {children}
                      </p>
                    ) : (
                      <p className="whitespace-pre text-sm before:content-['\a'] md:text-base">
                        {children}
                      </p>
                    ),
                },
                list: {
                  number: ({ children }) => (
                    <ol className="ml-10 list-decimal text-sm font-light md:text-base">
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanity.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ post: PostType }> = async ({
  params,
}) => {
  const post = await sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    {
      slug: params?.slug || "",
    }
  );

  return {
    props: {
      post,
    },
  };
};

export default Post;

Post.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
