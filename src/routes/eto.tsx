import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/eto")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/eto", title: "Emerging Technologies Olympiad | i2OL", description: "The optional industry pitching event for qualified i2OL projects." }),
  component: () => <SitePage page="eto" />,
});
