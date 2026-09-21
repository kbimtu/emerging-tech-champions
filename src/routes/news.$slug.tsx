import { createFileRoute } from "@tanstack/react-router";
import { NewsArticle } from "@/components/news-blog";

export const Route = createFileRoute("/news/$slug")({
  head: () => ({ meta: [{title:"i2OL News Article"},{name:"description",content:"News and updates from the i2OL network."},{property:"og:title",content:"i2OL News Article"},{property:"og:description",content:"News and updates from the i2OL network."},{property:"og:type",content:"article"},{name:"twitter:card",content:"summary_large_image"}] }),
  component: ArticleRoute,
});
function ArticleRoute(){const {slug}=Route.useParams();return <NewsArticle slug={slug}/>}