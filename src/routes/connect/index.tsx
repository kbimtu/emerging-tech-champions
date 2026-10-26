import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/connect", title: "Connect | i2OL", description: "Join the i2OL network through lessons, committees, collaboration, alumni, and judging." }),
  component: () => <SitePage page="connect" />,
});
