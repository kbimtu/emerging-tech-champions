import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/adjudication")({
  head: () => ({ meta: [
    { title: "Adjudication | i2OL 2026" },
    { name: "description", content: "Compare qualifier, ETO expo, and international final evaluation criteria." },
    { property: "og:title", content: "Adjudication | i2OL 2026" },
    { property: "og:description", content: "Compare qualifier, ETO expo, and international final evaluation criteria." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="adjudication" />,
});
