import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/")({
  head: () => ({ meta: [
    { title: "Compete in i2OL 2026" },
    { name: "description", content: "Explore IDSOL, IBCOL, and IQCOL streams and categories for 2026." },
    { property: "og:title", content: "Compete in i2OL 2026" },
    { property: "og:description", content: "Explore IDSOL, IBCOL, and IQCOL streams and categories for 2026." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="compete" />,
});
