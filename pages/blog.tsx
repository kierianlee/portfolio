import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../components/layout/layout";
import WithCodeTags from "../components/with-code-tag";
import { sanity } from "../lib/sanity";
import dayjs from "dayjs";
import { Post } from "../types/post";
import PageTitle from "../components/page-title";
import { motion } from "framer-motion";
import SanityImage from "../components/sanity-image";
import { NextSeo } from "next-seo";

const postsQuery = `*[_type == "post"] | order(date desc) { 
  _id,
  image {
    asset->{
      ...,
      metadata
    }
  },
  date,
  title,
  subtitle,
  slug
}`;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await sanity.fetch(postsQuery);

  return {
    props: {
      posts,
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

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title="Kierian - Blog"
        description="My musings"
        openGraph={{
          url: "https://kierian.me/blog",
          title: "Kierian - Blog",
          description: "My musings",
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
          <PageTitle title="Blog" />
        </WithCodeTags>
        <div></div>
        <motion.div
          className="mx-auto mt-16 flex max-w-xl flex-col gap-16"
          variants={containerAnimationVariants}
          initial="hidden"
          animate="show"
        >
          {posts.map((post: Post, index: number) => (
            <Post post={post} key={index} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

const Post = ({
  post: { image, title, subtitle, date, slug },
}: {
  post: Post;
}) => {
  return (
    <motion.div variants={childAnimationVariants}>
      <Link href={`/blog/${slug.current}`}>
        <motion.div className="isolated relative flex items-center gap-6">
          <div className="relative h-24 w-24 [&>span]:rounded-full">
            <div className="[&>img]:rounded-full [&>img]:object-cover">
              <SanityImage alt={title} fill sanityImage={image.asset} />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-base font-bold md:text-xl">{title}</div>
            <div className="font-mono text-xs text-muted dark:text-dimmed">
              {dayjs(date).format("DD MMM YYYY")}
            </div>
            <div className="mt-4 font-mono text-xs md:text-sm">{subtitle}</div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Blog;

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
