import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/alumni")({
  head: () => ({ meta: [
    { title: "Alumni | i2OL" },
    { name: "description", content: "Join the international i2OL alumni community." },
    { property: "og:title", content: "Alumni | i2OL" },
    { property: "og:description", content: "Join the international i2OL alumni community." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="alumni" />,
});
