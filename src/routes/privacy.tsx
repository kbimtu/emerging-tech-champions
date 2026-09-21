import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | i2OL" },
    { name: "description", content: "Privacy practices of Kingsbridge Institute Limited and i2OL." },
    { property: "og:title", content: "Privacy Policy | i2OL" },
    { property: "og:description", content: "Privacy practices of Kingsbridge Institute Limited and i2OL." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="privacy" />,
});
