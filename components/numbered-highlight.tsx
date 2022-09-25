import Highlight, { defaultProps } from "prism-react-renderer";
import { ComponentProps } from "react";

const NumberedHighlight = (
  props: Omit<ComponentProps<typeof Highlight>, "Prism" | "children">
) => {
  return (
    <Highlight {...defaultProps} {...props}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          className={
            className +
            " mb-4 flex flex-row overflow-x-auto rounded-lg p-2 text-sm shadow-lg sm:p-4 sm:text-base md:p-6 w-full"
          }
          style={{ ...style }}
        >
          <pre className="text-xs md:text-sm">
            <div className="flex flex-row gap-1.5 sm:gap-3">
              <div className="flex flex-col items-end">
                {tokens.map((_, index) => {
                  return (
                    <span className="opacity-30 select-none" key={index}>
                      {index + 1}
                    </span>
                  );
                })}
              </div>
              <div className="flex flex-col items-start">
                {tokens.map((line, index) => {
                  const lineProps = getLineProps({ line, key: index });
                  return (
                    <div key={index} {...lineProps}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default NumberedHighlight;
