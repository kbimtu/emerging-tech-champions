import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { NewsEditor } from "@/components/news-blog";

export const Route = createFileRoute("/_authenticated/news/editor")({
  staticData: { sitemap: false },
  head: () => pageHead({ path: "/news/editor", title: "News Editor | i2OL", description: "Private article publishing for i2OL News.", noindex: true }),
  component: NewsEditor,
});