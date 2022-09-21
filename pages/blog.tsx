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
      <div className="flex flex-col items-center h-full pt-16 pb-32 px-8">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="text-3xl font-semibold my-4">Blog</h1>
        </WithCodeTags>
        <div></div>
        <div className="max-w-xl mx-auto mt-16 flex flex-col gap-16">
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
      <a className="isolated relative flex gap-6 items-center">
        <div className="relative h-24 w-24">
          <Image
            {...imageProps}
            alt={title}
            className="object-cover rounded-full"
            layout="fill"
            sizes="100%"
            placeholder="blur"
          />
        </div>
        <div className="flex-1">
          <div className="font-bold text-md md:text-xl">{title}</div>
          <div className="font-mono text-xs text-dimmed">
            {dayjs(date).format("DD MMM YYYY")}
          </div>
          <div className="font-mono text-xs md:text-sm mt-4">{subtitle}</div>
        </div>
      </a>
    </Link>
  );
};

export default Blog;

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
