'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CaseStudyCardProps {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  thumb: string;
  video?: string | null;
  url: string;
}

export function CaseStudies({ studies }: { studies: CaseStudyCardProps[] }) {
  return (
    <section id="case-studies" className="section-shell">
      <div className="container-shell">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Experiments of Intelligence</p>
          <h2 className="font-heading text-4xl md:text-5xl">Case studies</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {studies.map((study, index) => (
            <CaseStudyTile key={study.slug} {...study} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyTile({ title, summary, tags, thumb, url, video, delay }: CaseStudyCardProps & { delay: number }) {
  const hasVideo = Boolean(video);
  return (
    <Link
      href={url}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
    >
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ rotateX: 2, rotateY: -2 }}
        transition={{ delay, duration: 0.5 }}
        className="glass-panel overflow-hidden"
      >
        <motion.div className="relative h-64 overflow-hidden rounded-[calc(var(--kp-radius)-8px)]" whileHover={{ y: -6 }}>
          {thumb && (
            <Image
              src={thumb}
              alt={title}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          )}
          {hasVideo && (
            <video
              src={video!}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-70" />
        </motion.div>
        <div className="p-6">
          <h3 className="font-heading text-3xl">{title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{summary}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]">
            {tags.map((tag) => (
              <span key={tag} className="rounded-pill border border-white/10 px-3 py-1 text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
