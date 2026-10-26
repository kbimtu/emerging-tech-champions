import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/submission")({
  head: () => pageHead({ path: "/compete/submission", title: "Submission | i2OL 2026", description: "Whitepaper, prototype, pitch deck, and posterboard requirements for i2OL 2026." }),
  component: () => <SitePage page="submission" />,
});
