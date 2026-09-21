import { createFileRoute } from "@tanstack/react-router";
import { NewsEditor } from "@/components/news-blog";

export const Route = createFileRoute("/_authenticated/news/editor")({
  head: () => ({ meta: [{title:"News Editor | i2OL"},{name:"description",content:"Private article publishing for i2OL News."},{property:"og:title",content:"News Editor | i2OL"},{property:"og:description",content:"Private article publishing for i2OL News."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}] }),
  component: NewsEditor,
});