import { useNextSanityImage } from "next-sanity-image";
import { sanity } from "../lib/sanity";
import Image from "next/image";
import { ComponentProps } from "react";

const SanityImage = ({ src, ...props }: ComponentProps<typeof Image>) => {
  const imageProps = useNextSanityImage(sanity, src);

  return <Image alt="" {...props} {...imageProps} />;
};

export default SanityImage;
