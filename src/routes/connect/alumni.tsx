import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/alumni")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/connect/alumni", title: "Alumni | i2OL", description: "Join the international i2OL alumni community." }),
  component: () => <SitePage page="alumni" />,
});
