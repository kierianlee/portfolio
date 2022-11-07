import { useNextSanityImage } from "next-sanity-image";
import { sanity } from "../lib/sanity";
import Image from "next/image";
import { ComponentProps } from "react";

const SanityImage = ({
  sanityImage,
  ...props
}: Omit<ComponentProps<typeof Image>, "src"> & {
  sanityImage: {
    url: string;
    metadata: {
      lqip: string;
    };
  };
}) => {
  const imageProps = useNextSanityImage(sanity, sanityImage);

  return (
    <Image
      {...props}
      {...(props.fill
        ? {
            src: imageProps.src,
            loader: imageProps.loader,
            placeholder: "blur",
            blurDataURL: sanityImage.metadata.lqip,
          }
        : imageProps)}
    />
  );
};

export default SanityImage;
