import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { UserRound, ImageOff } from "lucide-react";

export type DirectoryPage = "school" | "organization" | "committee" | "sponsor" | "steam" | "shape" | "adjudicator" | "organizer";
type DirectoryEntry = { id: string; name: string; website_url: string; logo_path: string; sort_order: number; sector: string | null; frame_shape: string; logo_url: string };
type DirectoryTier = { id: string; title: string; subtitle: string; directory_entries: DirectoryEntry[] };

const directoryTitles: Record<DirectoryPage, string> = {
  school: "Supporting Schools", organization: "Supporting Organizations",
  committee: "Regional Committees", sponsor: "Sponsors", steam: "STEAM Committee",
  shape: "SHAPE Committee", adjudicator: "Adjudicators", organizer: "Organizing Committee",
};

export function SupportDirectory({ pageType }: { pageType: DirectoryPage }) {
  const [tiers, setTiers] = useState<DirectoryTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    void (async () => {
      const { data, error: queryError } = await supabase
        .from("directory_tiers")
        .select("id,title,subtitle,sort_order,directory_entries(id,name,website_url,logo_path,sort_order,sector,frame_shape,is_published)")
        .eq("page_type", pageType)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (queryError) throw queryError;
      const result = await Promise.all((data ?? []).map(async (tier) => ({
        ...tier,
        directory_entries: await Promise.all((tier.directory_entries ?? [])
          .filter((e) => e.is_published)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(async (e) => {
            const { data: signed } = await supabase.storage.from("directory-logos").createSignedUrl(e.logo_path, 3600);
            return { ...e, logo_url: signed?.signedUrl ?? "" };
          })),
      })));
      if (active) { setTiers(result); setLoading(false); }
    })().catch(() => { if (active) { setError(true); setLoading(false); } });
    return () => { active = false; };
  }, [pageType, reload]);

  if (loading) return <p className="directory-status">Loading directory…</p>;
  if (error) return <section className="support-directory" aria-label={directoryTitles[pageType]}><h3>{directoryTitles[pageType]}</h3><p className="directory-status" role="alert">The directory could not be loaded.</p><Button variant="outline" className="mt-4" onClick={() => setReload(value => value + 1)}>Try again</Button></section>;
  if (tiers.length === 0) return <section className="support-directory" aria-label={directoryTitles[pageType]}><header className="directory-empty"><h3>{directoryTitles[pageType]}</h3><p>No listings have been published yet.</p></header></section>;

  const isPeoplePage = ["steam", "shape", "adjudicator", "organizer"].includes(pageType);

  return (
    <div className={`support-directory ${isPeoplePage ? "is-people" : ""}`} aria-label={directoryTitles[pageType]}>
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
                    {entry.logo_url ? <img src={entry.logo_url} alt={`${entry.name}`} loading="lazy" width={80} height={80}/> : isPeoplePage ? <UserRound aria-label="Photo unavailable"/> : <ImageOff aria-label="Logo unavailable"/>}
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
