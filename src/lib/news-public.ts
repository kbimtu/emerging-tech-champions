import { queryOptions } from "@tanstack/react-query";
import { getPublishedArticle } from "./news-public.functions";

export const publishedArticleOptions = (slug: string) => queryOptions({
  queryKey: ["published-news", slug],
  queryFn: () => getPublishedArticle({ data: { slug } }),
  staleTime: 30_000,
});