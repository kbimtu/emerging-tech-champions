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
      .select("id,page_type,title,subtitle,sort_order")
      .eq("page_type", data.pageType)
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    
    if (error) throw error;

    const tierIds = (tiers ?? []).map((tier) => tier.id);
    if (tierIds.length === 0) return [];

    const { data: entries, error: entriesError } = await supabasePublic
      .from("directory_entries")
      .select("id,tier_id,name,website_url,logo_path,sort_order,sector,frame_shape")
      .in("tier_id", tierIds)
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (entriesError) throw entriesError;
    
    return Promise.all((tiers ?? []).map(async (tier) => ({
      ...tier,
      directory_entries: await Promise.all((entries ?? []).filter((entry) => entry.tier_id === tier.id).map(async (entry) => {
        const { data: signed } = await supabasePublic.storage.from("directory-logos").createSignedUrl(entry.logo_path, 3600);
        return { ...entry, logo_url: signed?.signedUrl ?? "" };
      })),
    })));
  });
