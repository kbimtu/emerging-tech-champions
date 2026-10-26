import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/shape")({
  head: () => pageHead({ path: "/connect/shape", title: "SHAPE Committee | i2OL", description: "Join the i2OL SHAPE committee connecting technology with people, society, humanities, and the arts." }),
  component: () => <SitePage page="shape" />,
});