import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ReactElement } from "react";
import Layout from "../../components/layout/layout";
import WithCodeTags from "../../components/with-code-tag";
import { sanity } from "../../lib/sanity";
import dayjs from "dayjs";
import { type Post as PostType } from "../../types/post";
import ArticlePortableText from "../../components/article-portable-text";
import SanityImage from "../../components/sanity-image";
import { NextSeo } from "next-seo";
import { useNextSanityImage } from "next-sanity-image";

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageProps = useNextSanityImage(sanity, post.image);

  return (
    <>
      <NextSeo
        title={`Kierian - ${post.title}`}
        description={post.subtitle}
        openGraph={{
          url: `https://kierian.me/blog/${post.slug.current}`,
          title: `Kierian - ${post.title}`,
          description: post.subtitle,
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
          <div className="my-4 text-center">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <small className="text-dimmed">
              {dayjs(post.date).format("DD MMM YYYY hh:mmA")}
            </small>
          </div>
        </WithCodeTags>
        <div className="mx-auto mt-12 w-full max-w-2xl">
          <div className="relative h-48 sm:h-[300px] md:h-[400px] [&>img]:object-cover">
            <SanityImage
              sanityImage={post.image.asset}
              fill
              alt={post.title}
              className="cover"
            />
          </div>
          <WithCodeTags tag="article" className="mt-16">
            <ArticlePortableText value={post.content} />
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
    `*[_type == "post" && slug.current == $slug][0] { 
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
      content,
      slug
    }`,
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
