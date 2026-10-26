import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/about")({
  head: () => pageHead({ path: "/about", title: "About i2OL", description: "The mission and global community behind the International Olympiad in Emerging Technologies." }),
  component: () => <SitePage page="about" />,
});
