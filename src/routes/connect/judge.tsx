import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/judge")({
  head: () => pageHead({ path: "/connect/judge", title: "Become an Adjudicator | i2OL", description: "Apply to assess emerging-technology projects for i2OL." }),
  component: () => <SitePage page="judge" />,
});
