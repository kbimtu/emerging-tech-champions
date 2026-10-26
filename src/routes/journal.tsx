import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/journal")({
  head: () => pageHead({ path: "/journal", title: "Journal | i2OL", description: "The future open-access home for i2OL technical whitepapers." }),
  component: () => <SitePage page="journal" />,
});
