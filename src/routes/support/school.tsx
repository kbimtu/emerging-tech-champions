import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/school")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/support/school", title: "Supporting Schools | i2OL", description: "Give students a supported start and receive complimentary team registrations." }),
  component: () => <SitePage page="school" />,
});
