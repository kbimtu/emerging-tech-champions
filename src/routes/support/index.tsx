import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/support", title: "Support i2OL", description: "Support schools, organizations, regional hosts, donors, and sponsors." }),
  component: () => <SitePage page="support" />,
});
