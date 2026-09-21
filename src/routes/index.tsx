import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "i2OL 2026 | International Olympiad in Emerging Technologies" },
    { name: "description", content: "Practical problem-solving competitions in data science, blockchain, and quantum computing." },
    { property: "og:title", content: "i2OL 2026" }, { property: "og:description", content: "Build practical emerging-technology projects for global evaluation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <SitePage page="home" />;
}
