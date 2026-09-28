import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/organizing")({
  head: () => ({ meta: [
    { title: "Organizing Committee | i2OL" },
    { name: "description", content: "Meet the international organizing committee driving the i2OL season." },
    { property: "og:title", content: "Organizing Committee | i2OL" },
    { property: "og:description", content: "Meet the international organizing committee driving the i2OL season." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="organizing" />,
});
