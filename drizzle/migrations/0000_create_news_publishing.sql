CREATE TYPE public.app_role AS ENUM ('editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "Users can read their own role"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.claim_news_editor()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  PERFORM pg_advisory_xact_lock(20260921);
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'editor') THEN
    RETURN public.has_role(auth.uid(), 'editor');
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'editor');
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_news_editor() TO authenticated;

CREATE TABLE public.news_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 160),
  summary text NOT NULL CHECK (char_length(summary) BETWEEN 10 AND 400),
  content text NOT NULL CHECK (char_length(content) BETWEEN 20 AND 50000),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.news_posts TO authenticated;
GRANT ALL ON public.news_posts TO service_role;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published news is public"
ON public.news_posts FOR SELECT TO anon, authenticated
USING (status = 'published');
CREATE POLICY "Editors can read all news"
ON public.news_posts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors can create news"
ON public.news_posts FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'editor') AND created_by = auth.uid());
CREATE POLICY "Editors can update news"
ON public.news_posts FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'editor'))
WITH CHECK (public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors can delete news"
ON public.news_posts FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'editor'));

CREATE INDEX news_posts_publication_idx ON public.news_posts (status, published_at DESC);

CREATE OR REPLACE FUNCTION public.set_news_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  IF NEW.status = 'published' AND (OLD.status IS DISTINCT FROM 'published' OR NEW.published_at IS NULL) THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER set_news_updated_at
BEFORE UPDATE ON public.news_posts
FOR EACH ROW EXECUTE FUNCTION public.set_news_updated_at();