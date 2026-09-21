import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/organization")({
  head: () => ({ meta: [
    { title: "Supporting Organizations | i2OL" },
    { name: "description", content: "Provide industry insight, resources, and mentorship to global student teams." },
    { property: "og:title", content: "Supporting Organizations | i2OL" },
    { property: "og:description", content: "Provide industry insight, resources, and mentorship to global student teams." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="organization" />,
});
