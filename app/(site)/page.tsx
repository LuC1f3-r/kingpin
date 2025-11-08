import { allCaseStudyDocs } from "contentlayer/generated";
import { NeuralHero } from "@/components/hero/NeuralHero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";

export const runtime = "edge";
export const revalidate = 60;

export default function SitePage() {
  const studies = allCaseStudyDocs
    .map((study) => ({
      slug: study.slug,
      title: study.title,
      summary: study.summary,
      tags: study.tags,
      thumb: study.thumb,
      video: study.video,
      url: study.url
    }))
    .sort((a, b) => (a.slug > b.slug ? 1 : -1));

  return (
    <>
      <NeuralHero />
      <About />
      <Services />
      <CaseStudies studies={studies} />
      <Philosophy />
      <Contact />
    </>
  );
}
