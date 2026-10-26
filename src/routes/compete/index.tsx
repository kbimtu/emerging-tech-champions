import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/compete", title: "Compete in i2OL 2026", description: "Explore IDSOL, IBCOL, and IQCOL streams and categories for 2026." }),
  component: () => <SitePage page="compete" />,
});
