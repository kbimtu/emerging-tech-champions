import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/adjudication")({
  head: () => pageHead({ path: "/compete/adjudication", title: "Adjudication | i2OL 2026", description: "Compare qualifier, ETO expo, and international final evaluation criteria." }),
  component: () => <SitePage page="adjudication" />,
});
