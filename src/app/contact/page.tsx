import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/site.config";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <h1 className="text-2xl font-medium tracking-tight text-foreground">
        Contact
      </h1>
      <p className="mt-3 max-w-md text-base text-muted-foreground">
        The best way to reach me is by email. I&apos;m also on GitHub and
        LinkedIn.
      </p>

      <ul className="mt-10 flex flex-col gap-4">
        <li>
          <Link
            href={`mailto:${siteConfig.social.email}`}
            className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
          >
            <Mail size={17} className="text-muted-foreground" />
            {siteConfig.social.email}
          </Link>
        </li>
        <li>
          <Link
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
          >
            <GitHubIcon width={17} height={17} className="text-muted-foreground" />
            GitHub
          </Link>
        </li>
        <li>
          <Link
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
          >
            <LinkedInIcon width={17} height={17} className="text-muted-foreground" />
            LinkedIn
          </Link>
        </li>
      </ul>
    </div>
  );
}
