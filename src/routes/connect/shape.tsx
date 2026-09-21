import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/shape")({
  head: () => ({ meta: [
    { title: "SHAPE Committee | i2OL" },
    { name: "description", content: "Join the i2OL SHAPE committee connecting technology with people, society, humanities, and the arts." },
    { property: "og:title", content: "SHAPE Committee | i2OL" },
    { property: "og:description", content: "Join the i2OL SHAPE committee connecting technology with people, society, humanities, and the arts." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="shape" />,
});