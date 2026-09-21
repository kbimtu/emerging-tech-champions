import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/qualifier")({
  head: () => ({ meta: [
    { title: "Qualifier | i2OL 2026" },
    { name: "description", content: "Learn how i2OL qualification works and how to host a regional qualifier." },
    { property: "og:title", content: "Qualifier | i2OL 2026" },
    { property: "og:description", content: "Learn how i2OL qualification works and how to host a regional qualifier." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="qualifier" />,
});
