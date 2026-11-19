import type { ReactNode } from "react";
import { isValidElement } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import CopyCode from "./CopyCode";
import { resolveDocHref } from "@/lib/content";

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return "";
}

export default function MarkdownArticle({ body, sourceFile }: { body: string; sourceFile: string }) {
  return <div className="prose">
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={{
      a({ href, children }) {
        const link = resolveDocHref(sourceFile, href ?? "#");
        if (/^https?:\/\//.test(link)) return <a href={link} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>;
        return <Link href={link}>{children}</Link>;
      },
      pre({ children }) {
        const value = nodeText(children).replace(/\n$/, "");
        return <div className="code-shell"><div className="code-heading"><span>Command / source</span><CopyCode value={value}/></div><pre tabIndex={0}>{children}</pre></div>;
      },
      table({children}) { return <div className="table-scroll" role="region" aria-label="Scrollable data table" tabIndex={0}><table>{children}</table></div>; },
      blockquote({children}) { return <blockquote className="article-note">{children}</blockquote>; },
    }}>{body.replace(/^# .+\n/, "")}</ReactMarkdown>
  </div>;
}
