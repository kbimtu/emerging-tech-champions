import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/submission")({
  head: () => ({ meta: [
    { title: "Submission | i2OL 2026" },
    { name: "description", content: "Whitepaper, prototype, pitch deck, and posterboard requirements for i2OL 2026." },
    { property: "og:title", content: "Submission | i2OL 2026" },
    { property: "og:description", content: "Whitepaper, prototype, pitch deck, and posterboard requirements for i2OL 2026." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="submission" />,
});
