import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/qualifier")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/compete/qualifier", title: "Qualifier | i2OL 2026", description: "Learn how i2OL qualification works and how to host a regional qualifier." }),
  component: () => <SitePage page="qualifier" />,
});
