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
- Keep the News listing in an index route so dynamic article routes render independently; the parent must never swallow article pages.
