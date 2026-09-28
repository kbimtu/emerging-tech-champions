import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const pageTypeSchema = z.enum(["school", "organization", "committee", "sponsor"]);

export const getPublicDirectory = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ pageType: pageTypeSchema }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: tiers, error } = await supabaseAdmin
      .from("directory_tiers")
      .select("id,page_type,title,subtitle,sort_order,directory_entries(id,name,website_url,logo_path,sort_order)")
      .eq("page_type", data.pageType)
      .eq("is_published", true)
      .eq("directory_entries.is_published", true)
      .order("sort_order", { ascending: true })
      .order("sort_order", { referencedTable: "directory_entries", ascending: true });
    if (error) throw error;

    return Promise.all((tiers ?? []).map(async (tier) => ({
      ...tier,
      directory_entries: await Promise.all((tier.directory_entries ?? []).map(async (entry) => {
        const { data: signed } = await supabaseAdmin.storage.from("directory-logos").createSignedUrl(entry.logo_path, 3600);
        return { ...entry, logo_url: signed?.signedUrl ?? "" };
      })),
    })));
  });