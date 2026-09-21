import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/eto")({
  head: () => ({ meta: [
    { title: "Emerging Technologies Olympiad | i2OL" },
    { name: "description", content: "The optional industry pitching event for qualified i2OL projects." },
    { property: "og:title", content: "Emerging Technologies Olympiad | i2OL" },
    { property: "og:description", content: "The optional industry pitching event for qualified i2OL projects." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="eto" />,
});
