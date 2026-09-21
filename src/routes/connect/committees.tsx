import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/committees")({
  head: () => ({ meta: [
    { title: "Committees | i2OL" },
    { name: "description", content: "Apply to i2OL, IDSOL, IBCOL, and IQCOL steering and advisory committees." },
    { property: "og:title", content: "Committees | i2OL" },
    { property: "og:description", content: "Apply to i2OL, IDSOL, IBCOL, and IQCOL steering and advisory committees." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="committees" />,
});
