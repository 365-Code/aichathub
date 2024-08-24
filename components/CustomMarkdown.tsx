import { useTheme } from "next-themes";
import React from "react";
import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import ReactSyntaxHighlighter, {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";
import { darkula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {
  oneDark,
  vsDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { lightfair } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  dark,
  materialDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const CustomMarkdown = ({ children }: { children: React.ReactNode }) => {


  const {theme} = useTheme()


  return (
    <Markdown
      className={"mt-0 pt-0"}
      children={String(children)}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={theme == "light" ? oneLight : oneDark}
            />
          ) : (
            <code
              {...rest}
              className={`${className} border bg-transparent mt-0 pt-0`}
            >
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default CustomMarkdown;
