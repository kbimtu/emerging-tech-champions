ALTER TABLE public.directory_entries ADD COLUMN sector text;
ALTER TABLE public.directory_tiers DROP CONSTRAINT directory_tiers_page_type_check;
ALTER TABLE public.directory_tiers ADD CONSTRAINT directory_tiers_page_type_check CHECK (page_type IN ('school', 'organization', 'committee', 'sponsor', 'steam', 'shape', 'adjudicator', 'organizer'));
COMMENT ON COLUMN public.directory_entries.sector IS 'Optional sector label for people directories.';