import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/committees")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/connect/committees", title: "Committees | i2OL", description: "Apply to i2OL, IDSOL, IBCOL, and IQCOL steering and advisory committees." }),
  component: () => <SitePage page="committees" />,
});
