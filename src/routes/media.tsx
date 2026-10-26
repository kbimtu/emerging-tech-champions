import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/media")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/media", title: "Media | i2OL", description: "Press contacts, brand packages, and social media resources." }),
  component: () => <SitePage page="media" />,
});
