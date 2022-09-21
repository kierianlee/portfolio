import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/future/image";
import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { sanity } from "../lib/sanity";
import dayjs from "dayjs";

const postsQuery = `*[_type == "post"] { 
  _id,
  "imageUrl": image.asset->url,
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
      <div className="flex flex-col items-center h-full py-16">
        <WithCodeTags tag="h1" className="mt-12">
          <h1 className="text-3xl font-semibold my-4">Blog</h1>
        </WithCodeTags>
        <div></div>
        <div className="max-w-xl mx-auto mt-16 flex flex-col gap-16">
          {posts.map(
            ({ _id, imageUrl, title, subtitle, date }: any, index: number) => (
              <Link href={`/post/${_id}`} key={index} passHref>
                <a className="isolated relative flex gap-6 items-center">
                  <div className="relative h-24 w-24">
                    <Image
                      src={imageUrl}
                      alt={title}
                      className="object-cover rounded-full"
                      fill
                      sizes="100%"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xl">{title}</div>
                    <div className="font-mono text-xs text-dimmed">
                      {dayjs(date).format("DD MMM YYYY")}
                    </div>
                    <div className="font-mono text-sm mt-4">{subtitle}</div>
                  </div>
                </a>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
