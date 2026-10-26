import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/sponsor")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/sponsor", title: "Sponsor | i2OL", description: "Invest in emerging-technology projects or sponsor the global i2OL community." }),
  component: () => <SitePage page="sponsor" />,
});
