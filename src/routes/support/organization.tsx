import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/organization")({
  head: () => pageHead({ path: "/support/organization", title: "Supporting Organizations | i2OL", description: "Provide industry insight, resources, and mentorship to global student teams." }),
  component: () => <SitePage page="organization" />,
});
