CREATE TABLE public.directory_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type text NOT NULL CHECK (page_type IN ('school', 'organization', 'committee', 'sponsor')),
  title text NOT NULL CHECK (char_length(title) BETWEEN 2 AND 120),
  subtitle text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.directory_tiers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.directory_tiers TO authenticated;
GRANT ALL ON public.directory_tiers TO service_role;
ALTER TABLE public.directory_tiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published directory tiers are public" ON public.directory_tiers FOR SELECT TO anon, authenticated USING (is_published OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors create directory tiers" ON public.directory_tiers FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'editor') AND created_by = auth.uid());
CREATE POLICY "Editors update directory tiers" ON public.directory_tiers FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors delete directory tiers" ON public.directory_tiers FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.directory_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_id uuid NOT NULL REFERENCES public.directory_tiers(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 160),
  website_url text NOT NULL DEFAULT '',
  logo_path text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.directory_entries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.directory_entries TO authenticated;
GRANT ALL ON public.directory_entries TO service_role;
ALTER TABLE public.directory_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published directory entries are public" ON public.directory_entries FOR SELECT TO anon, authenticated USING (is_published AND EXISTS (SELECT 1 FROM public.directory_tiers t WHERE t.id = tier_id AND t.is_published) OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors create directory entries" ON public.directory_entries FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'editor') AND created_by = auth.uid());
CREATE POLICY "Editors update directory entries" ON public.directory_entries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors delete directory entries" ON public.directory_entries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'editor'));

CREATE INDEX directory_tiers_page_order_idx ON public.directory_tiers(page_type, sort_order);
CREATE INDEX directory_entries_tier_order_idx ON public.directory_entries(tier_id, sort_order);

CREATE POLICY "Public reads directory logos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'directory-logos');
CREATE POLICY "Editors upload directory logos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'directory-logos' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors update directory logos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'directory-logos' AND public.has_role(auth.uid(), 'editor')) WITH CHECK (bucket_id = 'directory-logos' AND public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors delete directory logos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'directory-logos' AND public.has_role(auth.uid(), 'editor'));
