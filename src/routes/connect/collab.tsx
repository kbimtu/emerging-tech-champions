import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/collab")({
  head: () => ({ meta: [
    { title: "Collab | i2OL" },
    { name: "description", content: "Person-to-person networks for builders, educators, and industry." },
    { property: "og:title", content: "Collab | i2OL" },
    { property: "og:description", content: "Person-to-person networks for builders, educators, and industry." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="collab" />,
});
