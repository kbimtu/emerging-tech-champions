import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/privacy", title: "Privacy Policy | i2OL", description: "Privacy practices of Kingsbridge Institute Limited and i2OL." }),
  component: () => <SitePage page="privacy" />,
});
