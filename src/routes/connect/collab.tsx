import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/connect/collab")({
  head: () => pageHead({ path: "/connect/collab", title: "Collab | i2OL", description: "Person-to-person networks for builders, educators, and industry." }),
  component: () => <SitePage page="collab" />,
});
