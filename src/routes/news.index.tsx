import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { NewsFeed } from "@/components/news-blog";

export const Route = createFileRoute("/news/")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/news", title: "News | i2OL", description: "Announcements and media coverage from the i2OL network." }),
  component: NewsFeed,
});
