import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

const components = {
  a: ({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href.startsWith("http");
    return isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <Link href={href} {...props} />
    );
  },
  img: ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;
    return (
      <span className="relative my-6 block aspect-video overflow-hidden rounded-lg bg-surface">
        <Image src={src} alt={alt ?? ""} fill className="object-cover" />
      </span>
    );
  },
};

export function MarkdownContent({ source }: { source: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
