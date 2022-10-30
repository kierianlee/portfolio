import { useNextSanityImage } from "next-sanity-image";
import { sanity } from "../lib/sanity";
import Image from "next/image";
import { ComponentProps } from "react";

const SanityImage = ({ src, ...props }: ComponentProps<typeof Image>) => {
  const imageProps = useNextSanityImage(sanity, src);

  return (
    <Image
      {...props}
      {...(props.fill
        ? {
            loader: imageProps.loader,
            placeholder: imageProps.placeholder,
            src: imageProps.src,
            blurDataURL: imageProps.blurDataURL,
          }
        : imageProps)}
    />
  );
};

export default SanityImage;
