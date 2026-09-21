import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/contributing")({
  head: () => ({ meta: [
    { title: "Host a Regional Qualifier | i2OL" },
    { name: "description", content: "Help expand i2OL locally as an experienced governmental or non-governmental organization." },
    { property: "og:title", content: "Host a Regional Qualifier | i2OL" },
    { property: "og:description", content: "Help expand i2OL locally as an experienced governmental or non-governmental organization." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="contributing" />,
});
