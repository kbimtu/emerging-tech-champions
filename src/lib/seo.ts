import { pagePreviews } from "./page-previews";

export const SITE_ORIGIN = "https://www.i2ol.org";
// Asset serving is public even before the canonical domain is connected.
export const PREVIEW_ASSET_ORIGIN = "https://id-preview--f37608bd-ad26-4218-b0cb-f087cd0fc1a6.lovable.app";
export const HOME_TITLE = "i2OL | International Olympiad in Emerging Technologies";
export const HOME_DESCRIPTION = "Practical problem-solving competitions themed around emerging technologies. Submissions are open on a rolling basis.";
export const competitionPreview = { url: `${PREVIEW_ASSET_ORIGIN}${pagePreviews["/"].url}`, width: 1200, height: 630, mimeType: "image/jpeg", alt: "International Olympiad in Emerging Technologies: practical problem-solving competitions and rolling submissions" };

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
  image?: { url: string; width: number; height: number; mimeType?: string; alt?: string }; noindex?: boolean;
}) {
  const url = `${SITE_ORIGIN}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  const header = pagePreviews[path as keyof typeof pagePreviews];
  const preview = image ?? (noindex ? undefined : header ? {
    url: `${PREVIEW_ASSET_ORIGIN}${header.url}`, width: 1200, height: 630,
    mimeType: header.content_type, alt: header.alt,
  } : competitionPreview);
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:type", content: type }, { property: "og:url", content: url },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:site_name", content: "i2OL" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: url }, { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(preview ? [
        { property: "og:image", content: preview.url },
        { property: "og:image:secure_url", content: preview.url },
        { property: "og:image:width", content: String(preview.width) },
        { property: "og:image:height", content: String(preview.height) },
        ...(preview.mimeType ? [{ property: "og:image:type", content: preview.mimeType }] : []),
        ...(preview.alt ? [
          { property: "og:image:alt", content: preview.alt },
          { name: "twitter:image:alt", content: preview.alt },
        ] : []),
        { name: "twitter:image", content: preview.url },
      ] : []),
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: noindex ? [] : [{ type: "application/ld+json", children: JSON.stringify(navigationSchema) }],
  };
}
