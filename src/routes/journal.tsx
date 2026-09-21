import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [
    { title: "Journal | i2OL" },
    { name: "description", content: "The future open-access home for i2OL technical whitepapers." },
    { property: "og:title", content: "Journal | i2OL" },
    { property: "og:description", content: "The future open-access home for i2OL technical whitepapers." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="journal" />,
});
