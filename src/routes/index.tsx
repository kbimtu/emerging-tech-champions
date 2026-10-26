import { pageHead, HOME_TITLE, HOME_DESCRIPTION } from "@/lib/seo";
import homepagePreview from "@/assets/page-previews/home.jpg.asset.json";
import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/site-page";

export const Route = createFileRoute("/")({
  head: () => pageHead({ path: "/", title: HOME_TITLE, description: HOME_DESCRIPTION, image: {
    url: `https://id-preview--f37608bd-ad26-4218-b0cb-f087cd0fc1a6.lovable.app${homepagePreview.url}`,
    width: 1200, height: 630, mimeType: "image/jpeg",
    alt: "International Olympiad in Emerging Technologies homepage",
  } }),
  component: Index,
});

function Index() {
  return <SitePage page="home" />;
}
