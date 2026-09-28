-- Add image_path to news_posts if not exists
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='news_posts' AND column_name='image_path') THEN
    ALTER TABLE public.news_posts ADD COLUMN image_path text;
  END IF;
END $$;

-- Extend directory_tiers and directory_entries
ALTER TABLE public.directory_tiers DROP CONSTRAINT IF EXISTS directory_tiers_page_type_check;
ALTER TABLE public.directory_tiers ADD CONSTRAINT directory_tiers_page_type_check 
  CHECK (page_type IN ('school', 'organization', 'committee', 'sponsor', 'steam', 'shape', 'adjudicator', 'organizer'));

-- Add sector and frame_shape to directory_entries
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='directory_entries' AND column_name='sector') THEN
    ALTER TABLE public.directory_entries ADD COLUMN sector text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='directory_entries' AND column_name='frame_shape') THEN
    ALTER TABLE public.directory_entries ADD COLUMN frame_shape text NOT NULL DEFAULT 'square' CHECK (frame_shape IN ('square', 'circle'));
  END IF;
END $$;

-- Storage bucket policies
-- Ensure buckets exist (must be done via dashboard/API, but we can set policies)
CREATE POLICY "Public reads news images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'news-images');
CREATE POLICY "Editors upload news images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors update news images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor')) WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors delete news images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor'));
