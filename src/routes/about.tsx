import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About i2OL" },
    { name: "description", content: "The mission and global community behind the International Olympiad in Emerging Technologies." },
    { property: "og:title", content: "About i2OL" },
    { property: "og:description", content: "The mission and global community behind the International Olympiad in Emerging Technologies." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="about" />,
});
