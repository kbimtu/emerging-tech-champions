import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Edit3, LogOut, Plus, Save, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DirectoryEditor } from "@/components/directory-editor";

type NewsPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
  image_path: string | null;
};

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)) : "Draft";

export function NewsFeed() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    void supabase
      .from("news_posts")
      .select("id,slug,title,summary,content,status,published_at,updated_at,image_path")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data, error: loadError }) => {
        if (loadError) setError("News could not be loaded. Please try again shortly.");
        else setPosts((data as NewsPost[] | null) ?? []);
        setLoading(false);
      });
  }, []);
  return <main><section className="page-hero is-color tone-media"><div className="page-hero-shade"/><div className="relative mx-auto w-full max-w-[1440px] px-5 py-14 md:py-20 lg:px-8"><p className="eyebrow">News</p><h1 className="page-title">Signals from across the network.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-background/80">Announcements, stories, and updates from i2OL and its specialist competition communities.</p></div></section><section className="section"><div className="section-inner"><p className="eyebrow">Latest articles</p><h2 className="section-title">From the i2OL newsroom</h2>{loading?<p className="text-muted-foreground">Loading news…</p>:error?<div className="news-empty" role="alert"><h3>News is temporarily unavailable.</h3><p>{error}</p></div>:posts.length===0?<div className="news-empty"><h3>Stories are being prepared.</h3><p>Published updates will appear here.</p></div>:<div className="news-grid">{posts.map(post=><article key={post.id}><time>{formatDate(post.published_at)}</time><h2>{post.title}</h2><p>{post.summary}</p><Link to="/news/$slug" params={{slug:post.slug}}>Read article <ArrowUpRight/></Link></article>)}</div>}</div></section></main>;
}

export function NewsArticle({ slug }: { slug: string }) {
  const [post, setPost] = useState<NewsPost | null | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => { 
    void supabase.from("news_posts").select("id,slug,title,summary,content,status,published_at,updated_at,image_path").eq("slug", slug).eq("status", "published").maybeSingle().then(async ({ data, error }) => {
      const p = error ? null : data as NewsPost | null;
      setPost(p);
      if (p?.image_path) {
        const { data: signed } = await supabase.storage.from("news-images").createSignedUrl(p.image_path, 3600);
        setImageUrl(signed?.signedUrl ?? null);
      }
    }); 
  }, [slug]);
  if (post === undefined) return <main className="article-shell"><p>Loading article…</p></main>;
  if (post === null) return <main className="article-shell"><h1>Article not found</h1><Button asChild variant="outline"><Link to="/news"><ArrowLeft/> Back to News</Link></Button></main>;
  return <main><article className="news-article"><Link to="/news" className="news-back"><ArrowLeft/> News</Link><time>{formatDate(post.published_at)}</time><h1>{post.title}</h1>{imageUrl && <img src={imageUrl} alt="" className="news-article-image" />}<p className="news-summary">{post.summary}</p><div className="news-body">{post.content.split(/\n\n+/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div></article></main>;
}

type NewsForm = Pick<NewsPost, "id" | "title" | "slug" | "summary" | "content" | "status" | "image_path">;
const emptyForm: NewsForm = { id: "", title: "", slug: "", summary: "", content: "", status: "draft", image_path: null };
export function NewsEditor() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("Checking editor access…");
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [saving, setSaving] = useState(false);
  const load = useCallback(async () => {
    const { data, error } = await supabase.from("news_posts").select("id,slug,title,summary,content,status,published_at,updated_at,image_path").order("updated_at", { ascending: false });
    if (error) { setMessage("Articles could not be loaded. Please refresh and try again."); return false; }
    setPosts((data as NewsPost[] | null) ?? []);
    return true;
  }, []);
  useEffect(() => { void (async () => {
    const { data, error } = await supabase.rpc("claim_news_editor");
    if (error || !data) { setMessage("This editor already belongs to another account."); setCheckingAccess(false); return; }
    setAllowed(true);
    setMessage("");
    await load();
    setCheckingAccess(false);
  })(); }, [load]);
  const suggestedSlug = useMemo(() => form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), [form.title]);
  const save = async (event: FormEvent, publish = false) => {
    event.preventDefault();
    const title = form.title.trim();
    const summary = form.summary.trim();
    const content = form.content.trim();
    const slug = (form.slug || suggestedSlug).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug || title.length < 3 || summary.length < 10 || content.length < 20) { setMessage("Add a title, a summary of at least 10 characters, and an article of at least 20 characters."); return; }
    setSaving(true);
    setMessage("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMessage("Your session expired. Please sign in again."); setSaving(false); return; }
    
    let image_path = form.image_path;
    if (imageFile) {
      const extension = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
      image_path = `${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from("news-images").upload(image_path, imageFile, { contentType: imageFile.type, upsert: false });
      if (error) { setMessage(error.message); setSaving(false); return; }
    }

    const status: NewsPost["status"] = publish ? "published" : form.status;
    const existing = posts.find((post) => post.id === form.id);
    const values = { title, slug, summary, content, status, created_by: user.id, published_at: status === "published" ? existing?.published_at ?? new Date().toISOString() : null, image_path };
    const result = form.id
      ? await supabase.from("news_posts").update(values).eq("id", form.id)
      : await supabase.from("news_posts").insert(values);
    setSaving(false);
    if (result.error) { setMessage(result.error.code === "23505" ? "That web address is already used by another article." : result.error.message); return; }
    setMessage(publish ? "Article published." : form.status === "published" ? "Published article updated." : "Draft saved.");
    setForm(emptyForm);
    setImageFile(null);
    await load();
  };
  const edit=(post:NewsPost)=>setForm({id:post.id,title:post.title,slug:post.slug,summary:post.summary,content:post.content,status:post.status,image_path:post.image_path});
  const remove=async(id:string)=>{if(!window.confirm("Delete this article permanently?"))return;setSaving(true);const {error}=await supabase.from("news_posts").delete().eq("id",id);setSaving(false);if(error){setMessage(error.message);return;}if(form.id===id)setForm(emptyForm);setMessage("Article deleted.");await load();};
  const unpublish=async()=>{if(!form.id)return;setSaving(true);const {error}=await supabase.from("news_posts").update({status:"draft",published_at:null}).eq("id",form.id);setSaving(false);if(error){setMessage(error.message);return;}setForm(emptyForm);setMessage("Article moved to drafts.");await load();};
  const signOut=async()=>{await supabase.auth.signOut();await navigate({to:"/auth",search:{next:"/news/editor"},replace:true});};
  if(!allowed)return <main className="editor-shell"><h1>News editor</h1><p className="mt-4 text-muted-foreground" role="status">{message}</p>{!checkingAccess&&<Button className="mt-6" variant="outline" onClick={signOut}><LogOut/> Sign out</Button>}</main>;
  return <main className="editor-shell"><div className="editor-heading"><div><p className="eyebrow">Private publishing</p><h1>Content editor</h1></div><div className="flex gap-2"><Button asChild variant="outline"><Link to="/news">View News</Link></Button><Button variant="outline" onClick={signOut}><LogOut/> Sign out</Button></div></div><div className="editor-layout"><form className="editor-form" onSubmit={(event)=>void save(event)}><div className="editor-form-heading"><h2>{form.id?"Edit article":"New article"}</h2>{form.id&&<Button type="button" variant="outline" size="sm" onClick={()=>{setForm(emptyForm);setMessage("");}}><Plus/> New</Button>}</div><label>Title<Input required minLength={3} maxLength={160} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Article title"/></label><label>Web address<Input value={form.slug} onChange={e=>setForm({...form,slug:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,"")})} placeholder={suggestedSlug || "article-title"}/><small>{form.slug || suggestedSlug ? `/news/${form.slug || suggestedSlug}` : "Created automatically from the title"}</small></label><label>Image<Input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setImageFile(e.target.files?.[0]??null)}/><small>{form.image_path ? "Existing image uploaded" : "Optional header image"}</small></label><label>Summary<Textarea required minLength={10} maxLength={400} value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})} placeholder="A short introduction for the News page"/><small>{form.summary.length}/400</small></label><label>Article<Textarea required minLength={20} maxLength={50000} className="min-h-72" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} placeholder="Write the article. Separate paragraphs with a blank line."/><small>{form.content.length}/50,000</small></label>{message&&<p className="editor-message" role="status">{message}</p>}<div className="flex flex-wrap gap-3"><Button disabled={saving} type="submit" variant="outline"><Save/> {saving?"Saving…":form.status==="published"?"Save changes":"Save draft"}</Button><Button disabled={saving} type="button" onClick={(event)=>void save(event,true)}>{saving?"Working…":form.status==="published"?"Update published article":"Publish now"}<ArrowUpRight/></Button>{form.id&&form.status==="published"&&<Button disabled={saving} type="button" variant="outline" onClick={()=>void unpublish()}>Unpublish</Button>}</div></form><aside className="editor-posts"><h2>Articles</h2>{posts.length===0?<p className="mt-4 text-sm text-muted-foreground">No drafts or articles yet.</p>:posts.map(post=><article key={post.id}><span>{post.status}</span><h3>{post.title}</h3><time>{formatDate(post.published_at)}</time><div><Button disabled={saving} size="icon" variant="outline" aria-label={`Edit ${post.title}`} title="Edit article" onClick={()=>edit(post)}><Edit3/></Button>{post.status==="published"&&<Button asChild size="icon" variant="outline"><Link to="/news/$slug" params={{slug:post.slug}} aria-label={`View ${post.title}`} title="View published article"><ArrowUpRight/></Link></Button>}<Button disabled={saving} size="icon" variant="outline" aria-label={`Delete ${post.title}`} title="Delete article" onClick={()=>void remove(post.id)}><Trash2/></Button></div></article>)}</aside></div><DirectoryEditor/></main>;
}
