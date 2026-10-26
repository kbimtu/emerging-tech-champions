import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export const getPublishedArticle = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1).max(200) }))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Public news is temporarily unavailable.");
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { data: post, error } = await client.from("news_posts")
      .select("id,slug,title,summary,content,status,published_at,updated_at,image_path")
      .eq("slug", data.slug).eq("status", "published").maybeSingle();
    if (error) throw new Error("Public news is temporarily unavailable.");
    let imageUrl: string | null = null;
    if (post?.image_path) {
      const { data: signed } = await client.storage.from("news-images").createSignedUrl(post.image_path, 3600);
      if (signed?.signedUrl) {
        const browserUrl = import.meta.env.VITE_SUPABASE_URL;
        imageUrl = browserUrl ? signed.signedUrl.replace(url, browserUrl) : null;
      }
    }
    return { post, imageUrl };
  });