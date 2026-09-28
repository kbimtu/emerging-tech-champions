# Support directories and editor access

## What will change
- Remove the large mobile/tablet spacing between the homepage submission and competition buttons, including the menu-area spacing visible in the selected phone view.
- Keep the editor as a single fixed account with no signup or profile creation, and disable new account registration at the authentication layer.
- Set the existing editor account password to the requested value without storing it in project files or displaying it in the app.
- Expand the private editor with a second workspace for four public directories:
  - Supporting Schools
  - Supporting Organizations
  - Regional Committees
  - Sponsorships
- Let the editor create, edit, order, and delete tier headings such as “Gold Sponsor” or “Partner Sponsor.”
- Let the editor add entries beneath each tier with a logo upload, organization/company/committee name, and website link.
- Show these entries publicly on their matching pages, grouped by tier with subtitle headings and full-width divider lines.

## Access and safety
- Reuse the existing server-enforced editor role limited to `info@i2ol.org`.
- Public visitors can only read published directory entries; only the editor can manage them.
- Logo files will use a dedicated public image bucket with editor-only upload/update/delete permissions.
- No profile table will be created.

## Technical details
- Add tier and directory-entry tables with explicit grants, row-level access rules, ordering fields, and page-type validation.
- Add a logo storage bucket and access policies.
- Extend the existing editor screen rather than creating another login or account system.
- Preserve the current static supporter-history animation on Supporting Organizations and place the editable directory alongside the existing page content.
- Verify the four public pages, editor access controls, logo flow, and phone/tablet button spacing.
