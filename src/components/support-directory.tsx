import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export type DirectoryPage = "school" | "organization" | "committee" | "sponsor" | "steam" | "shape" | "adjudicator" | "organizer";
type DirectoryEntry = { id: string; name: string; website_url: string; logo_path: string; sort_order: number; sector: string | null; frame_shape: string; logo_url: string };
type DirectoryTier = { id: string; title: string; subtitle: string; directory_entries: DirectoryEntry[] };

export function SupportDirectory({ pageType }: { pageType: DirectoryPage }) {
  const [tiers, setTiers] = useState<DirectoryTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void (async () => {
      const { data } = await supabase
        .from("directory_tiers")
        .select("id,title,subtitle,sort_order,directory_entries(id,name,website_url,logo_path,sort_order,sector,frame_shape,is_published)")
        .eq("page_type", pageType)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      const result = await Promise.all((data ?? []).map(async (tier: any) => ({
        ...tier,
        directory_entries: await Promise.all(((tier.directory_entries ?? []) as any[])
          .filter((e) => e.is_published)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(async (e) => {
            const { data: signed } = await supabase.storage.from("directory-logos").createSignedUrl(e.logo_path, 3600);
            return { ...e, logo_url: signed?.signedUrl ?? "" };
          })),
      })));
      if (active) { setTiers(result); setLoading(false); }
    })();
    return () => { active = false; };
  }, [pageType]);

  if (loading) return <p className="directory-status">Loading directory…</p>;
  if (tiers.length === 0) return null;

  const isPeoplePage = ["steam", "shape", "adjudicator", "organizer"].includes(pageType);

  return (
    <div className={`support-directory ${isPeoplePage ? "is-people" : ""}`}>
      {tiers.map((tier) => (
        <section className="directory-tier" key={tier.id}>
          <header>
            <h3>{tier.title}</h3>
            {tier.subtitle && <p>{tier.subtitle}</p>}
          </header>
          <div className="directory-grid">
            {tier.directory_entries.map((entry) => {
              const Content = (
                <>
                  <div className={`directory-image-wrap ${entry.frame_shape === 'circle' ? 'is-circle' : ''}`}>
                    <img src={entry.logo_url} alt={`${entry.name}`} loading="lazy"/>
                  </div>
                  <div className="directory-info">
                    <strong>{entry.name}</strong>
                    {entry.sector && <small>{entry.sector}</small>}
                  </div>
                  {entry.website_url && !isPeoplePage && <ExternalLink aria-hidden="true"/>}
                </>
              );

              if (entry.website_url) {
                return (
                  <a 
                    href={entry.website_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="directory-entry" 
                    key={entry.id}
                  >
                    {Content}
                  </a>
                );
              }

              return (
                <div className="directory-entry" key={entry.id}>
                  {Content}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
