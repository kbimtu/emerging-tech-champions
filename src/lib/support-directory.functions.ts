import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const pageTypeSchema = z.enum(["school", "organization", "committee", "sponsor", "steam", "shape", "adjudicator", "organizer"]);

export const getPublicDirectory = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ pageType: pageTypeSchema }).parse(data))
  .handler(async ({ data }) => {
    const supabasePublic = createClient<Database>(process.env['SUPABASE_URL']!, process.env['SUPABASE_PUBLISHABLE_KEY']!, { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } });
    const { data: tiers, error } = await supabasePublic
      .from("directory_tiers")
      .select("id,page_type,title,subtitle,sort_order,directory_entries(id,name,website_url,logo_path,sort_order,sector,frame_shape)")
      .eq("page_type", data.pageType)
      .eq("is_published", true)
      .eq("directory_entries.is_published", true)
      .order("sort_order", { ascending: true })
      .order("sort_order", { referencedTable: "directory_entries", ascending: true });
    
    if (error) throw error;
    
    return Promise.all((tiers ?? []).map(async (tier) => ({
      ...tier,
      directory_entries: await Promise.all((tier.directory_entries ?? []).map(async (entry) => {
        const { data: signed } = await supabasePublic.storage.from("directory-logos").createSignedUrl(entry.logo_path, 3600);
        return { ...entry, logo_url: signed?.signedUrl ?? "" };
      })),
    })));
  });
