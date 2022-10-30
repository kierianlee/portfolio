import { DefaultSeoProps } from "next-seo";

const seoConfig: DefaultSeoProps = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kierian.me/",
    siteName: "Kierian",
    title: "Kierian",
    description:
      "I specialize in creating, designing, developing and deploying software systems at scale.",
    images: [
      {
        url: "https://kierian.me/site.jpg",
        width: 600,
        height: 600,
        alt: "Kierian",
        type: "image/jpeg",
      },
    ],
  },
};

export default seoConfig;
