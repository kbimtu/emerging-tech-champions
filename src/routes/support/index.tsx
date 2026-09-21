import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/")({
  head: () => ({ meta: [
    { title: "Support i2OL" },
    { name: "description", content: "Support schools, organizations, regional hosts, donors, and sponsors." },
    { property: "og:title", content: "Support i2OL" },
    { property: "og:description", content: "Support schools, organizations, regional hosts, donors, and sponsors." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="support" />,
});
