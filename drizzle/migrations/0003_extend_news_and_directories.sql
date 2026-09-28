-- Add image_path to news_posts
ALTER TABLE public.news_posts ADD COLUMN image_path text;

-- Create directory_people table
CREATE TABLE public.directory_people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('steam', 'shape', 'adjudicator', 'organizer')),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 160),
  sector text NOT NULL CHECK (char_length(sector) BETWEEN 2 AND 160),
  photo_path text NOT NULL,
  frame_type text NOT NULL DEFAULT 'square' CHECK (frame_type IN ('square', 'circle')),
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.directory_people TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.directory_people TO authenticated;
GRANT ALL ON public.directory_people TO service_role;
ALTER TABLE public.directory_people ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published people are public" ON public.directory_people 
FOR SELECT TO anon, authenticated 
USING (is_published OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors create people" ON public.directory_people 
FOR INSERT TO authenticated 
WITH CHECK (public.has_role(auth.uid(), 'editor') AND created_by = auth.uid());

CREATE POLICY "Editors update people" ON public.directory_people 
FOR UPDATE TO authenticated 
USING (public.has_role(auth.uid(), 'editor')) 
WITH CHECK (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors delete people" ON public.directory_people 
FOR DELETE TO authenticated 
USING (public.has_role(auth.uid(), 'editor'));

CREATE INDEX directory_people_category_order_idx ON public.directory_people(category, sort_order);

-- Storage buckets for new content (assumed created via UI, but policies needed)
-- bucket: news-images
-- bucket: people-photos

CREATE POLICY "Public reads news images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'news-images');
CREATE POLICY "Editors upload news images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors update news images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor')) WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors delete news images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Public reads people photos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'people-photos');
CREATE POLICY "Editors upload people photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'people-photos' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors update people photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'people-photos' AND public.has_role(auth.uid(), 'editor')) WITH CHECK (bucket_id = 'people-photos' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors delete people photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'people-photos' AND public.has_role(auth.uid(), 'editor'));
