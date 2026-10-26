import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/contributing")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/support/contributing", title: "Regional Committees | i2OL", description: "Help expand i2OL locally through regional committees, qualifiers, and ETO events." }),
  component: () => <SitePage page="contributing" />,
});
