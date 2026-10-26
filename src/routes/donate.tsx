import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/donate")({
  head: () => pageHead({ path: "/donate", title: "Donation Coming Soon | i2OL", description: "The i2OL donation portal is being prepared. Please check back for future donation opportunities." }),
  component: () => <SitePage page="donate" />,
});
