import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const groups = [
  { label: "About", href: "/about" },
  {
    label: "Compete",
    href: "/compete",
    items: [
      ["Competitions", "/compete"], ["Registration", "/compete/registration"],
      ["Submission", "/compete/submission"], ["Adjudication", "/compete/adjudication"],
      ["Key dates", "/compete/timeline"], ["Teams", "/compete/teams"],
      ["Accolades", "/compete/accolades"], ["Qualifier", "/compete/qualifier"],
    ],
  },
  { label: "ETO", href: "/eto" },
  {
    label: "Connect", href: "/connect",
    items: [["Lessons learned", "/connect/lessons"], ["News", "/news"], ["Committees", "/connect/committees"], ["STEAM", "/connect/steam"], ["SHAPE", "/connect/shape"], ["Collab", "/connect/collab"], ["Alumni", "/connect/alumni"], ["Adjudicator", "/connect/judge"]],
  },
  {
    label: "Support", href: "/support",
    items: [["Supporting schools", "/support/school"], ["Supporting organizations", "/support/organization"], ["Regional committees", "/support/contributing"], ["Organizing committee", "/support/organizing"], ["Donation", "/donate"], ["Sponsorship", "/sponsor"]],
  },
  { label: "Media", href: "/media" },
  { label: "Journal", href: "/journal" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-8">
        <Link to="/" className="group flex items-baseline gap-2" aria-label="i2OL home">
          <span className="font-display text-3xl font-black tracking-normal">i2OL</span>
          <span className="hidden text-[10px] font-bold uppercase text-muted-foreground sm:block">2026 season</span>
        </Link>
        <nav className="hidden h-full items-center gap-1 lg:flex" aria-label="Primary navigation">
          {groups.map((group) => (
            <div key={group.label} className="group relative flex h-full items-center">
              <a href={group.href} className="nav-link">{group.label}</a>
              {"items" in group && group.items ? (
                <div className="pointer-events-none absolute left-0 top-[calc(100%-1px)] w-60 translate-y-2 border border-border bg-popover p-2 opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  {group.items.map(([label, href]) => <a key={href} href={href} className="block px-3 py-2 text-sm font-medium hover:bg-accent">{label}</a>)}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex"><a href="https://join.i2ol.org" target="_blank" rel="noreferrer">Submit now <ArrowUpRight /></a></Button>
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger>
            <SheetContent className="w-[90vw] max-w-sm overflow-y-auto">
              <SheetTitle className="font-display text-2xl">i2OL</SheetTitle>
              <SheetDescription>International Olympiad in Emerging Technologies</SheetDescription>
              <nav className="mt-8 space-y-6">
                {groups.map((group) => <div key={group.label}>
                  <SheetClose asChild><a href={group.href} className="font-display text-xl font-bold">{group.label}</a></SheetClose>
                  {"items" in group && group.items ? <div className="mt-2 grid gap-1 border-l border-border pl-4">{group.items.map(([label, href]) => <SheetClose asChild key={href}><a href={href} className="py-1.5 text-sm text-muted-foreground">{label}</a></SheetClose>)}</div> : null}
                </div>)}
              </nav>
              <Button asChild className="mt-8 w-full"><a href="https://join.i2ol.org">Submit your project</a></Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-foreground text-background">
    <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-[2fr_1fr_1fr] lg:px-8">
      <div><div className="font-display text-5xl font-black">i2OL</div><p className="mt-3 max-w-md text-sm text-background/65">Practical problem-solving competitions for sustainable, responsible, evidence-based innovation.</p></div>
      <div><p className="footer-label">Contact</p><a href="mailto:info@i2ol.org">General Enquiries</a><a href="mailto:dpo@kb.institute">Data Protection Officer</a><a href="/privacy">Privacy Policy</a></div>
      <div><p className="footer-label">Network</p><a href="https://kb.institute">KB Institute</a><a href="https://nl.kb.institute">KBI Netherlands</a><a href="https://hk.kb.institute">KBI Hong Kong</a><a href="https://2026.idsol.org">IDSOL 2026</a><a href="https://2026.ibcol.org">IBCOL 2026</a><a href="https://2026.iqcol.org">IQCOL 2026</a></div>
    </div>
    <div className="border-t border-background/15 px-5 py-4 text-center text-xs text-background/50">© 2026 Königsberger Brückeninstitut Mittetulundusühing (KB Institute). All rights reserved.</div>
  </footer>;
}