import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCaseStudyDocs } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

export const runtime = "edge";
export const revalidate = 120;

export function generateStaticParams() {
  return allCaseStudyDocs.map((doc) => ({ slug: doc.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = allCaseStudyDocs.find((doc) => doc.slug === params.slug);
  if (!study) return { title: "Work" };
  return {
    title: `${study.title} | Work`,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      images: [{ url: study.thumb }]
    }
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = allCaseStudyDocs.find((doc) => doc.slug === params.slug);
  if (!study) notFound();
  const MDXContent = useMDXComponent(study.body.code);

  return (
    <article className="section-shell space-y-10">
      <Link
        href="/#case-studies"
        className="inline-flex items-center text-sm text-teal transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        ← Back to work
      </Link>
      <header className="space-y-4 max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Experiment</p>
        <h1 className="text-4xl md:text-6xl font-heading tracking-tight">{study.title}</h1>
        <p className="text-lg text-muted-foreground">{study.summary}</p>
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span key={tag} className="rounded-pill border border-glass px-3 py-1 text-xs tracking-wide uppercase text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="relative h-[420px] w-full overflow-hidden rounded-glass glass-panel">
        <Image src={study.thumb} alt={study.title} fill sizes="100vw" className="object-cover" priority />
      </div>
      <div className="mdx-body max-w-3xl space-y-6 text-base text-muted-foreground">
        <MDXContent />
      </div>
    </article>
  );
}
