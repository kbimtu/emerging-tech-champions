export const SITE_ORIGIN = "https://www.i2ol.org";
export const HOME_TITLE = "i2OL | International Olympiad in Emerging Technologies";
export const HOME_DESCRIPTION = "Practical problem-solving competitions themed around emerging technologies. Submissions are open on a rolling basis.";

export const navigationItems = [
  ["About", "/about"], ["Competitions", "/compete"], ["ETO", "/eto"],
  ["Connect", "/connect"], ["Support", "/support"], ["Media", "/media"],
  ["Journal", "/journal"], ["News", "/news"],
  ["IDSOL 2026", "https://2026.idsol.org"],
  ["IBCOL 2026", "https://2026.ibcol.org"],
  ["IQCOL 2026", "https://2026.iqcol.org"],
] as const;

export const navigationSchema = {
  "@context": "https://schema.org",
  "@graph": navigationItems.map(([name, path]) => ({
    "@type": "SiteNavigationElement", name,
    url: path.startsWith("https://") ? path : `${SITE_ORIGIN}${path}`,
  })),
};

export function pageHead({ path, title, description, type = "website", image, noindex = false }: {
  path: string; title: string; description: string; type?: "website" | "article";
  image?: { url: string; width: number; height: number }; noindex?: boolean;
}) {
  const url = `${SITE_ORIGIN}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:type", content: type }, { property: "og:url", content: url },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:site_name", content: "i2OL" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: url }, { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(image ? [
        { property: "og:image", content: image.url },
        { property: "og:image:width", content: String(image.width) },
        { property: "og:image:height", content: String(image.height) },
        { name: "twitter:image", content: image.url },
      ] : []),
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: noindex ? [] : [{ type: "application/ld+json", children: JSON.stringify(navigationSchema) }],
  };
}

export const competitionPreview = { url: `${SITE_ORIGIN}/assets/og-preview.png`, width: 1200, height: 630 };