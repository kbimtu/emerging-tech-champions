<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- News publishing uses Lovable Cloud row-level access restricted server-side to info@i2ol.org; public pages only query published posts, preventing draft exposure.
- Support directories use tier and entry records shared by four public pages; private logo objects are exposed only through short-lived signed URLs.
- Public leaf routes use the shared SEO helper with path-indexed, wide-framed 1200×630 header captures referenced through asset pointers and a homepage fallback for uncaptured articles; resolve image addresses against the publicly verified asset-serving origin independently of the canonical origin so unconnected domains cannot break thumbnails. Private noindex routes omit the fallback and root metadata must not contain canonical or share-image tags. Refresh header captures when visible page headers change.
- News article loaders use an anonymous publishable client filtered to published posts for initial HTML and metadata; never use privileged credentials or expiring signed image URLs in social tags.
- Sitemap URLs derive from required staticData.sitemap decisions on every route; exclude private subtrees and paginate published news with a session-free public client, failing without partial XML to avoid draft exposure and incomplete inventories.
- The shared SEO helper retains navigation JSON-LD and adds homepage identity schemas or public inner-page breadcrumbs so metadata stays consistent across routes.
