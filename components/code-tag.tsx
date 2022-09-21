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
      className={`pointer-events-none select-none text-base leading-none opacity-20 ${
        className ?? ""
      }`}
      {...props}
    >
      {`<${tag}>`}
    </div>
  );
};

export default CodeTag;
