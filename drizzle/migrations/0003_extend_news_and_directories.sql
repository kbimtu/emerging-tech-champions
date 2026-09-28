-- Add image_path to news_posts
ALTER TABLE public.news_posts ADD COLUMN image_path text;

-- Extend directory_tiers and directory_entries
-- Note: We can't easily alter enum constraints in a generic way across all DBs without knowing the constraint name,
-- but we can drop and recreate the constraint if we find it, or just use a new one.
-- Migration 0002 used: page_type text NOT NULL CHECK (page_type IN ('school', 'organization', 'committee', 'sponsor'))

ALTER TABLE public.directory_tiers DROP CONSTRAINT IF EXISTS directory_tiers_page_type_check;
ALTER TABLE public.directory_tiers ADD CONSTRAINT directory_tiers_page_type_check 
  CHECK (page_type IN ('school', 'organization', 'committee', 'sponsor', 'steam', 'shape', 'adjudicator', 'organizer'));

ALTER TABLE public.directory_entries ADD COLUMN sector text;
ALTER TABLE public.directory_entries ADD COLUMN frame_type text NOT NULL DEFAULT 'square' 
  CHECK (frame_type IN ('square', 'circle'));

-- Storage bucket policies for news images
-- We'll use the existing 'directory-logos' for all directory assets for simplicity, 
-- but add 'news-images' for articles.

CREATE POLICY "Public reads news images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'news-images');
CREATE POLICY "Editors upload news images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors update news images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor')) WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors delete news images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor'));
