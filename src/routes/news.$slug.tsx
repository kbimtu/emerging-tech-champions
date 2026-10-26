import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsArticle } from "@/components/news-blog";
import { publishedArticleOptions } from "@/lib/news-public";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params, context }) => {
    const article = await context.queryClient.ensureQueryData(publishedArticleOptions(params.slug));
    if (!article.post) throw notFound();
    return article;
  },
  head: ({ params, loaderData }) => pageHead({
    path: `/news/${encodeURIComponent(params.slug)}`,
    title: loaderData?.post ? `${loaderData.post.title} | i2OL News` : "Article Not Found | i2OL News",
    description: loaderData?.post?.summary ?? "This article is unavailable.",
    type: "article",
    noindex: !loaderData?.post,
  }),
  component: ArticleRoute,
});
function ArticleRoute(){const {slug}=Route.useParams();return <NewsArticle slug={slug}/>}