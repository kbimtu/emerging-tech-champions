import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/accolades")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/compete/accolades", title: "Accolades | i2OL 2026", description: "Awards of Distinction and Merit, medals, and special i2OL recognitions." }),
  component: () => <SitePage page="accolades" />,
});
