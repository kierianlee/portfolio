import { PortableText } from "@portabletext/react";
import { ComponentProps } from "react";
import NumberedHighlight from "./numbered-highlight";
import SanityImage from "./sanity-image";

const ArticlePortableText = (props: ComponentProps<typeof PortableText>) => {
  console.log(props.value);
  return (
    <PortableText
      {...props}
      components={{
        types: {
          code: ({ value: { code, language } }) => (
            <NumberedHighlight code={code} language={language} />
          ),
          image: ({ value }) => <SanityImage src={value} />,
        },
        block: {
          normal: ({ children }) =>
            (children as string[])?.[0] ? (
              <p className="text-sm font-light md:text-base">{children}</p>
            ) : (
              <p className="whitespace-pre text-sm before:content-['\a'] md:text-base">
                {children}
              </p>
            ),
        },
        list: {
          number: ({ children }) => (
            <ol className="ml-10 list-decimal text-sm font-light md:text-base">
              {children}
            </ol>
          ),
        },
        marks: {
          link: ({ children }) => (
            <a
              href="mailto:hey@kierian.me"
              className="text-blue-500 dark:text-crayola"
            >
              {children}
            </a>
          ),
        },
      }}
    />
  );
};

export default ArticlePortableText;
