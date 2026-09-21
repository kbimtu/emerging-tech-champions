import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/school")({
  head: () => ({ meta: [
    { title: "Supporting Schools | i2OL" },
    { name: "description", content: "Give students a supported start and receive complimentary team registrations." },
    { property: "og:title", content: "Supporting Schools | i2OL" },
    { property: "og:description", content: "Give students a supported start and receive complimentary team registrations." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="school" />,
});
