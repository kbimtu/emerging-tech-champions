import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/accolades")({
  head: () => ({ meta: [
    { title: "Accolades | i2OL 2026" },
    { name: "description", content: "Awards of Distinction and Merit, medals, and special i2OL recognitions." },
    { property: "og:title", content: "Accolades | i2OL 2026" },
    { property: "og:description", content: "Awards of Distinction and Merit, medals, and special i2OL recognitions." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="accolades" />,
});
