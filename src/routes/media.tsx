import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/media")({
  head: () => ({ meta: [
    { title: "Media | i2OL" },
    { name: "description", content: "Press contacts, brand packages, and social media resources." },
    { property: "og:title", content: "Media | i2OL" },
    { property: "og:description", content: "Press contacts, brand packages, and social media resources." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="media" />,
});
