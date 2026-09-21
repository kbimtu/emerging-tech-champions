import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/teams")({
  head: () => ({ meta: [
    { title: "Teams | i2OL 2026" },
    { name: "description", content: "The 2026 competition field is in progress. Build the i2OL chain while teams remain hidden." },
    { property: "og:title", content: "Teams | i2OL 2026" },
    { property: "og:description", content: "The 2026 competition field is in progress. Build the i2OL chain while teams remain hidden." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="teams" />,
});
