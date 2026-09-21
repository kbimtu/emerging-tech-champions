# Homepage footer and private News publishing

## Homepage and footer
- Remove the KB Institute → i2OL → IDSOL/IQCOL/IBCOL → ETO line from the homepage.
- Move the complete About i2OL block, including its introduction, three principles, and statistics, to the final homepage section immediately above the footer.
- Update the copyright to “© 2026 Königsberger Brückeninstitut Mittetulundusühing (KB Institute). All rights reserved”.

## Public News
- Replace the placeholder News section with a public blog feed containing published articles.
- Add individual article pages with titles, publication dates, summaries, and article content.
- Keep drafts and unpublished posts hidden from public visitors.

## Private editor
- Add a private News editor with email/password and Google sign-in.
- Secure publishing using server-checked editor permissions; the first signed-in account claims the sole editor role.
- Let the editor create, edit, save drafts, publish, unpublish, and delete posts.
- Add clear empty, loading, validation, and error states.

## Technical details
- Store news posts and editor roles in Lovable Cloud with row-level access rules.
- Keep roles in a dedicated role table and validate publishing permissions on the server.
- Add route-specific metadata for the editor and individual articles.

## Verification
- Check homepage section order and footer wording on desktop and phone widths.
- Test public News, private sign-in, draft visibility, publishing, editing, and unpublishing.
- Confirm the build has no errors and public visitors cannot access drafts or publishing controls.
