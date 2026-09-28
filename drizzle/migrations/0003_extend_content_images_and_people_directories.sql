ALTER TABLE public.news_posts ADD COLUMN image_path text;
ALTER TABLE public.directory_entries ADD COLUMN frame_shape text NOT NULL DEFAULT 'square';
ALTER TABLE public.directory_entries ADD CONSTRAINT directory_entries_frame_shape_check CHECK (frame_shape IN ('square', 'circle'));
ALTER TABLE public.directory_tiers DROP CONSTRAINT directory_tiers_page_type_check;
ALTER TABLE public.directory_tiers ADD CONSTRAINT directory_tiers_page_type_check CHECK (page_type IN ('school', 'organization', 'committee', 'sponsor', 'steam', 'shape', 'adjudicator', 'organizing'));
COMMENT ON COLUMN public.directory_entries.frame_shape IS 'Controls square or circular image presentation for directory entries.';
COMMENT ON COLUMN public.news_posts.image_path IS 'Optional private storage object path for the article image.';