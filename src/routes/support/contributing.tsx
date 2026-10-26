import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/contributing")({
  head: () => pageHead({ path: "/support/contributing", title: "Host a Regional Qualifier | i2OL", description: "Help expand i2OL locally as an experienced governmental or non-governmental organization." }),
  component: () => <SitePage page="contributing" />,
});
