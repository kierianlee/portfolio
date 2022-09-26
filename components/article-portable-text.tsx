import { PortableText } from "@portabletext/react";
import { ComponentProps } from "react";
import NumberedHighlight from "./numbered-highlight";
import SanityImage from "./sanity-image";

const ArticlePortableText = (props: ComponentProps<typeof PortableText>) => {
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
          h1: ({ children }) =>
            (children as string[])?.[0] ? (
              <h1 className="text-2xl font-semibold md:text-4xl">{children}</h1>
            ) : (
              <h1 className="whitespace-pre text-2xl before:content-['\a'] md:text-4xl">
                {children}
              </h1>
            ),
          h2: ({ children }) =>
            (children as string[])?.[0] ? (
              <h2 className="text-xl font-semibold md:text-3xl">{children}</h2>
            ) : (
              <h2 className="whitespace-pre text-xl before:content-['\a'] md:text-3xl">
                {children}
              </h2>
            ),
          h3: ({ children }) =>
            (children as string[])?.[0] ? (
              <h3 className="text-lg font-semibold md:text-2xl">{children}</h3>
            ) : (
              <h3 className="whitespace-pre text-lg before:content-['\a'] md:text-2xl">
                {children}
              </h3>
            ),
          h4: ({ children }) =>
            (children as string[])?.[0] ? (
              <h4 className="text-base font-semibold md:text-xl">{children}</h4>
            ) : (
              <h4 className="whitespace-pre text-base before:content-['\a'] md:text-xl">
                {children}
              </h4>
            ),
          h5: ({ children }) =>
            (children as string[])?.[0] ? (
              <h4 className="text-sm font-semibold md:text-base">{children}</h4>
            ) : (
              <h4 className="whitespace-pre text-sm before:content-['\a'] md:text-base">
                {children}
              </h4>
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
          link: ({ children, value }) => (
            <a href={value.href} className="text-blue-500 dark:text-crayola">
              {children}
            </a>
          ),
        },
      }}
    />
  );
};

export default ArticlePortableText;
