import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/steam")({
  head: () => ({ meta: [
    { title: "STEAM Committee | i2OL" },
    { name: "description", content: "Join the i2OL STEAM committee across science, technology, engineering, art, and mathematics." },
    { property: "og:title", content: "STEAM Committee | i2OL" },
    { property: "og:description", content: "Join the i2OL STEAM committee across science, technology, engineering, art, and mathematics." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="steam" />,
});