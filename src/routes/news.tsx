import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [
    { title: "News | i2OL" },
    { name: "description", content: "Announcements and media coverage from the i2OL network." },
    { property: "og:title", content: "News | i2OL" },
    { property: "og:description", content: "Announcements and media coverage from the i2OL network." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="news" />,
});
