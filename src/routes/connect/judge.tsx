import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/judge")({
  head: () => ({ meta: [
    { title: "Become an Adjudicator | i2OL" },
    { name: "description", content: "Apply to assess emerging-technology projects for i2OL." },
    { property: "og:title", content: "Become an Adjudicator | i2OL" },
    { property: "og:description", content: "Apply to assess emerging-technology projects for i2OL." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="judge" />,
});
