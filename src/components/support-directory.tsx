import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ExternalLink } from "lucide-react";
import { getPublicDirectory } from "@/lib/support-directory.functions";

export type DirectoryPage = "school" | "organization" | "committee" | "sponsor" | "steam" | "shape" | "adjudicator" | "organizer";
type DirectoryTier = Awaited<ReturnType<typeof getPublicDirectory>>[number];

export function SupportDirectory({ pageType }: { pageType: DirectoryPage }) {
  const getDirectory = useServerFn(getPublicDirectory);
  const [tiers, setTiers] = useState<DirectoryTier[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    void getDirectory({ data: { pageType } }).then(setTiers).finally(() => setLoading(false)); 
  }, [getDirectory, pageType]);

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
