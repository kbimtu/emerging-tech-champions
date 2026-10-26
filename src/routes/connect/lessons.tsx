import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/lessons")({
  head: () => pageHead({ path: "/connect/lessons", title: "Lessons Learned | i2OL", description: "Stories, videos, and technical reflections from i2OL competition communities." }),
  component: () => <SitePage page="lessons" />,
});
