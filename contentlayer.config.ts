import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const CaseStudyDoc = defineDocumentType(() => ({
  name: "CaseStudyDoc",
  contentType: "mdx",
  filePathPattern: "work/*.mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    thumb: { type: "string", required: true },
    video: { type: "string", required: false },
    featured: { type: "boolean", required: false, default: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/work/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}`
    }
  }
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [CaseStudyDoc]
});
