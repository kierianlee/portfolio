import { HTMLAttributes } from "react";

const CodeTag = ({
  className,
  style,
  tag,
  ...props
}: HTMLAttributes<HTMLElement> & { tag: string }) => {
  return (
    <div
      style={{ fontFamily: "'La Belle Aurore', cursive", ...style }}
      className={`text-base select-none pointer-events-none opacity-20 leading-none ${
        className ?? ""
      }`}
      {...props}
    >
      {`<${tag}>`}
    </div>
  );
};

export default CodeTag;
