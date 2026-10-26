import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/teams")({
  head: () => pageHead({ path: "/compete/teams", title: "Teams | i2OL 2026", description: "The 2026 competition field is in progress. Build the i2OL chain while teams remain hidden." }),
  component: () => <SitePage page="teams" />,
});
