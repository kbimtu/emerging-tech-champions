import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/timeline")({
  head: () => ({ meta: [
    { title: "Key Dates | i2OL 2026" },
    { name: "description", content: "Rolling submission deadlines, ETO conferences, judging, and results dates." },
    { property: "og:title", content: "Key Dates | i2OL 2026" },
    { property: "og:description", content: "Rolling submission deadlines, ETO conferences, judging, and results dates." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="timeline" />,
});
