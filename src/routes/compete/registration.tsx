import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/compete/registration")({
  head: () => pageHead({ path: "/compete/registration", title: "Registration | i2OL 2026", description: "Register a team, choose a competition, understand deadlines, fees, and waiver routes." }),
  component: () => <SitePage page="registration" />,
});
