import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ExternalLink } from "lucide-react";
import { getPublicDirectory } from "@/lib/support-directory.functions";

export type DirectoryPage = "school" | "organization" | "committee" | "sponsor";

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

  return <div className="support-directory">{tiers.map((tier) => <section className="directory-tier" key={tier.id}><header><div><h3>{tier.title}</h3>{tier.subtitle&&<p>{tier.subtitle}</p>}</div></header><div className="directory-grid">{tier.directory_entries.map((entry) => <a href={entry.website_url || undefined} target={entry.website_url ? "_blank" : undefined} rel={entry.website_url ? "noreferrer" : undefined} className="directory-entry" key={entry.id}><img src={entry.logo_url} alt={`${entry.name} logo`} loading="lazy"/><span>{entry.name}</span>{entry.website_url&&<ExternalLink aria-hidden="true"/>}</a>)}</div></section>)}</div>;
}