import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/support/organizing")({
  head: () => pageHead({ path: "/support/organizing", title: "Organizing Committee | i2OL", description: "Meet the international organizing committee driving the i2OL season." }),
  component: () => <SitePage page="organizing" />,
});
