import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/registration")({
  head: () => ({ meta: [
    { title: "Registration | i2OL 2026" },
    { name: "description", content: "Register a team, choose a competition, understand deadlines, fees, and waiver routes." },
    { property: "og:title", content: "Registration | i2OL 2026" },
    { property: "og:description", content: "Register a team, choose a competition, understand deadlines, fees, and waiver routes." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <SitePage page="registration" />,
});
