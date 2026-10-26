import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/donate")({
  head: () => pageHead({ path: "/donate", title: "Donate | i2OL", description: "Direct support to i2OL, IDSOL, IBCOL, IQCOL, or ETO." }),
  component: () => <SitePage page="donate" />,
});
