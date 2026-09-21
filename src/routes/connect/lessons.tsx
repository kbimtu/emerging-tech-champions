import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/lessons")({
  head: () => ({ meta: [
    { title: "Lessons Learned | i2OL" },
    { name: "description", content: "Stories, videos, and technical reflections from i2OL competition communities." },
    { property: "og:title", content: "Lessons Learned | i2OL" },
    { property: "og:description", content: "Stories, videos, and technical reflections from i2OL competition communities." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="lessons" />,
});
