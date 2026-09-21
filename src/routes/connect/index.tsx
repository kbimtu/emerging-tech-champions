import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/")({
  head: () => ({ meta: [
    { title: "Connect | i2OL" },
    { name: "description", content: "Join the i2OL network through lessons, committees, collaboration, alumni, and judging." },
    { property: "og:title", content: "Connect | i2OL" },
    { property: "og:description", content: "Join the i2OL network through lessons, committees, collaboration, alumni, and judging." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="connect" />,
});
