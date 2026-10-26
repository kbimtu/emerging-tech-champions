import { pageHead, HOME_TITLE, HOME_DESCRIPTION } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/")({
  head: () => pageHead({ path: "/", title: HOME_TITLE, description: HOME_DESCRIPTION }),
  component: Index,
});

function Index() {
  return <SitePage page="home" />;
}
