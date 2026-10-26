import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { isSitemapRouteIncluded, sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { collectSitemapPages } from "@/lib/sitemap-pages";
import { SITE_ORIGIN } from "@/lib/seo";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        try {
          const router = await getRouterInstance();
          const entries: SitemapEntry[] = sitemapStaticPaths(router).map(path => ({ path }));
          const routeId = "/news/$slug";
          if (isSitemapRouteIncluded(router.routesById[routeId])) {
            const url = process.env["SUPABASE_URL"];
            const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
            if (!url || !key) throw new Error("Public news configuration unavailable");
            const { createClient } = await import("@supabase/supabase-js");
            const client = createClient<Database>(url, key, {
              auth: { persistSession: false, autoRefreshToken: false },
              global: { fetch: (input, init) => {
                const headers = new Headers(init?.headers);
                if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
                headers.set("apikey", key);
                return fetch(input, { ...init, headers });
              } },
            });
            const posts = await collectSitemapPages(async (offset, size) => {
              const { data, error } = await client.from("news_posts").select("slug")
                .eq("status", "published").order("id").range(offset, offset + size - 1);
              if (error) throw error;
              if (!data) throw new Error("Missing public news response");
              return data;
            });
            for (const post of posts) {
              const location = router.buildLocation({ to: "/news/$slug", params: { slug: post.slug }, search: () => ({}), hash: "" });
              const path = sitemapPathForLocation(router, location, routeId);
              if (path) entries.push({ path });
            }
          }
          if (entries.length === 0) throw new Error("No discoverable pages");
          return new Response(sitemapXML(SITE_ORIGIN, entries), {
            headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
          });
        } catch {
          return new Response("Sitemap temporarily unavailable. Please retry later.", {
            status: 503, headers: { "Cache-Control": "no-store" },
          });
        }
      },
    },
  },
});