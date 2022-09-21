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
      <div className="flex flex-col items-center h-full pt-16 pb-32 px-8">
        <WithCodeTags tag="h1" className="mt-12">
          <div className="my-4 text-center">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <small className="text-dimmed">
              {dayjs(post.date).format("DD MMM YYYY hh:mmA")}
            </small>
          </div>
        </WithCodeTags>
        <div className="max-w-2xl mx-auto mt-12">
          <div className="relative h-48 sm:h-[300px] md:h-[400px]">
            <Image alt={post.title} layout="fill" {...imageProps} />
          </div>
          <WithCodeTags tag="article" className="mt-16">
            <PortableText
              value={post.content}
              components={{
                block: {
                  normal: ({ children }) =>
                    (children as string[])?.[0] ? (
                      <p className="font-light text-sm md:text-md">
                        {children}
                      </p>
                    ) : (
                      <p className="before:content-['\a'] whitespace-pre text-sm md:text-md">
                        {children}
                      </p>
                    ),
                },
                list: {
                  number: ({ children }) => (
                    <ol className="list-decimal ml-10 text-sm md:text-md">
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

const postsQuery = `*[_type == "post"] { _id }`;

const singlePostQuery = `*[_type == "post" && _id == $id] {
  _id,
  title,
  image,
  content,
  date
}[0]
`;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const posts = await sanity.fetch(postsQuery);
  const paths = posts.map((post: { _id: string }) => ({
    params: { id: post._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ post: PostType }> = async ({
  params,
}) => {
  // It's important to default the slug so that it doesn't return "undefined"
  const post = await sanity.fetch(singlePostQuery, {
    id: params?.id,
  });

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
