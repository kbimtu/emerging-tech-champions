import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/donate")({
  head: () => ({ meta: [
    { title: "Donate | i2OL" },
    { name: "description", content: "Direct support to i2OL, IDSOL, IBCOL, IQCOL, or ETO." },
    { property: "og:title", content: "Donate | i2OL" },
    { property: "og:description", content: "Direct support to i2OL, IDSOL, IBCOL, IQCOL, or ETO." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="donate" />,
});
