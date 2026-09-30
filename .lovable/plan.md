# Fix News and Directory Publishing

## Changes
- Repair News article navigation so each “Read article” link opens its matching published article.
- Make article imagery fill the available viewport area without stretching, using proportional cropping when needed.
- Correct public directory loading so published tiers and entries from the editor appear on their matching pages, including Mihkel Kerem’s organizing committee entry.
- Preserve private image storage by continuing to use temporary display links.

## Verification
- Open a published article from `/news` and confirm the correct article and image render.
- Check the relevant public directory page and confirm its tier and entry are visible.
- Test at desktop and phone widths and confirm the project builds successfully.
