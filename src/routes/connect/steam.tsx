import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/steam")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/connect/steam", title: "STEAM Committee | i2OL", description: "Join the i2OL STEAM committee across science, technology, engineering, art, and mathematics." }),
  component: () => <SitePage page="steam" />,
});