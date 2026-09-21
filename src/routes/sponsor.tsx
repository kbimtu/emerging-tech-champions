import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/sponsor")({
  head: () => ({ meta: [
    { title: "Sponsor | i2OL" },
    { name: "description", content: "Invest in emerging-technology projects or sponsor the global i2OL community." },
    { property: "og:title", content: "Sponsor | i2OL" },
    { property: "og:description", content: "Invest in emerging-technology projects or sponsor the global i2OL community." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="sponsor" />,
});
