import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { basePath, findLink, links } from "@/lib/links";

// Static hosting has no server to answer with a 302, so each code compiles to a page that redirects on arrival:
// script first (no history entry), meta refresh when JS is off, a plain link as the last resort.
export const dynamicParams = false;

export function generateStaticParams() {
  return links.flatMap((link) => [{ code: link.code }, { code: link.alias }]);
}

export const metadata: Metadata = {
  title: "Redirecting…",
  robots: { index: false, follow: true },
};

export default async function ShortLink({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const link = findLink(code);
  if (!link) notFound();
  const target = `${basePath}${link.target}`;

  return (
    <main className="redirect">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(target)})` }} />
      <p className="label">
        <span className="ok">redirect</span> /s/{code} → {link.target}
      </p>
      <a className="link-draw" href={target}>
        Continue to {link.title}
      </a>
    </main>
  );
}
