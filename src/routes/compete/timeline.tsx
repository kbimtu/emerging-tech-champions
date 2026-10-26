import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/timeline")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/compete/timeline", title: "Key Dates | i2OL 2026", description: "Rolling submission deadlines, ETO conferences, judging, and results dates." }),
  component: () => <SitePage page="timeline" />,
});
