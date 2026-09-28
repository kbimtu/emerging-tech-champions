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

  IF lower(COALESCE(auth.jwt() ->> 'email', '')) <> 'info@i2ol.org' THEN
    RETURN false;
  END IF;

  PERFORM pg_advisory_xact_lock(20260921);

  DELETE FROM public.user_roles
  WHERE role = 'editor'
    AND user_id <> auth.uid();

  INSERT INTO public.user_roles (user_id, role)
  VALUES (auth.uid(), 'editor')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_news_editor() TO authenticated;