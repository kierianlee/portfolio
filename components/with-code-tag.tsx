import { HTMLAttributes, ReactNode } from "react";
import CodeTag from "./code-tag";

const WithCodeTags = ({
  children,
  tag,
  ...props
}: HTMLAttributes<HTMLElement> & {
  tag: string;
}) => {
  return (
    <div {...props}>
      <CodeTag className="-ml-6" tag={tag} />
      <div>{children}</div>
      <CodeTag className="-ml-6" tag={`/${tag}`} />
    </div>
  );
};

export default WithCodeTags;
