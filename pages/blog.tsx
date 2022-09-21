import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { sanity } from "../lib/sanity";
import dayjs from "dayjs";
import { useNextSanityImage } from "next-sanity-image";
import { Post } from "../types/post";

const postsQuery = `*[_type == "post"] { 
  _id,
  image,
  date,
  title,
  subtitle
}`;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await sanity.fetch(postsQuery);

  return {
    props: {
      posts,
    },
  };
};

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Kierian - Blog</title>
      </Head>
      <div className="flex h-full flex-col items-center px-8 pt-16 pb-32">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="my-4 text-3xl font-semibold">Blog</h1>
        </WithCodeTags>
        <div></div>
        <div className="mx-auto mt-16 flex max-w-xl flex-col gap-16">
          {posts.map((post: Post, index: number) => (
            <Post post={post} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

const Post = ({
  post: { _id, image, title, subtitle, date },
}: {
  post: Post;
}) => {
  const imageProps = useNextSanityImage(sanity, image);

  return (
    <Link href={`/post/${_id}`} passHref>
      <a className="isolated relative flex items-center gap-6">
        <div className="relative h-24 w-24">
          <Image
            {...imageProps}
            alt={title}
            className="rounded-full object-cover"
            layout="fill"
            sizes="100%"
            placeholder="blur"
          />
        </div>
        <div className="flex-1">
          <div className="text-base font-bold md:text-xl">{title}</div>
          <div className="font-mono text-xs text-dimmed">
            {dayjs(date).format("DD MMM YYYY")}
          </div>
          <div className="mt-4 font-mono text-xs md:text-sm">{subtitle}</div>
        </div>
      </a>
    </Link>
  );
};

export default Blog;

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
