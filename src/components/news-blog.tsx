import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Edit3, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type NewsPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  status: string;
  published_at: string | null;
  updated_at: string;
};

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)) : "Draft";

export function NewsFeed() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { void supabase.from("news_posts").select("id,slug,title,summary,content,status,published_at,updated_at").eq("status", "published").order("published_at", { ascending: false }).then(({ data }) => { setPosts((data as NewsPost[] | null) ?? []); setLoading(false); }); }, []);
  return <main><section className="page-hero is-color tone-media"><div className="page-hero-shade"/><div className="relative mx-auto w-full max-w-[1440px] px-5 py-14 md:py-20 lg:px-8"><p className="eyebrow">News</p><h1 className="page-title">Signals from across the network.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-background/80">Announcements, stories, and updates from i2OL and its specialist competition communities.</p></div></section><section className="section"><div className="section-inner"><p className="eyebrow">Latest articles</p><h2 className="section-title">From the i2OL newsroom</h2>{loading?<p className="text-muted-foreground">Loading news…</p>:posts.length===0?<div className="news-empty"><h3>Stories are being prepared.</h3><p>Published updates will appear here.</p></div>:<div className="news-grid">{posts.map(post=><article key={post.id}><time>{formatDate(post.published_at)}</time><h2>{post.title}</h2><p>{post.summary}</p><Link to="/news/$slug" params={{slug:post.slug}}>Read article <ArrowUpRight/></Link></article>)}</div>}</div></section></main>;
}

export function NewsArticle({ slug }: { slug: string }) {
  const [post, setPost] = useState<NewsPost | null | undefined>(undefined);
  useEffect(() => { void supabase.from("news_posts").select("id,slug,title,summary,content,status,published_at,updated_at").eq("slug", slug).eq("status", "published").maybeSingle().then(({ data }) => setPost(data as NewsPost | null)); }, [slug]);
  if (post === undefined) return <main className="article-shell"><p>Loading article…</p></main>;
  if (post === null) return <main className="article-shell"><h1>Article not found</h1><Button asChild variant="outline"><Link to="/news"><ArrowLeft/> Back to News</Link></Button></main>;
  return <main><article className="news-article"><Link to="/news" className="news-back"><ArrowLeft/> News</Link><time>{formatDate(post.published_at)}</time><h1>{post.title}</h1><p className="news-summary">{post.summary}</p><div className="news-body">{post.content.split(/\n\n+/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div></article></main>;
}

const emptyForm = { id: "", title: "", slug: "", summary: "", content: "", status: "draft" };
export function NewsEditor() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("Checking editor access…");
  const [allowed, setAllowed] = useState(false);
  const [saving, setSaving] = useState(false);
  const load = async () => { const { data } = await supabase.from("news_posts").select("id,slug,title,summary,content,status,published_at,updated_at").order("updated_at", { ascending: false }); setPosts((data as NewsPost[] | null) ?? []); };
  useEffect(() => { void (async () => { const { data, error } = await supabase.rpc("claim_news_editor"); if (error || !data) { setMessage("This editor already belongs to another account."); return; } setAllowed(true); setMessage(""); await load(); })(); }, []);
  const suggestedSlug = useMemo(() => form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), [form.title]);
  const save = async (event: FormEvent, publish = false) => { event.preventDefault(); const slug=form.slug || suggestedSlug; if (!slug || form.title.length<3 || form.summary.length<10 || form.content.length<20) { setMessage("Add a title, summary, and article before saving."); return; } setSaving(true); setMessage(""); const { data:{ user } }=await supabase.auth.getUser(); if (!user) { setMessage("Please sign in again."); setSaving(false); return; } const values={ title:form.title.trim(), slug, summary:form.summary.trim(), content:form.content.trim(), status:publish?"published":form.status, created_by:user.id }; const result=form.id?await supabase.from("news_posts").update(values).eq("id",form.id):await supabase.from("news_posts").insert(values); setSaving(false); if(result.error){setMessage(result.error.message);return;} setMessage(publish?"Article published.":"Draft saved."); setForm(emptyForm); await load(); };
  const edit=(post:NewsPost)=>setForm({id:post.id,title:post.title,slug:post.slug,summary:post.summary,content:post.content,status:post.status});
  const remove=async(id:string)=>{if(!window.confirm("Delete this article permanently?"))return;await supabase.from("news_posts").delete().eq("id",id);if(form.id===id)setForm(emptyForm);await load();};
  const signOut=async()=>{await supabase.auth.signOut();await navigate({to:"/auth",search:{next:"/news/editor"},replace:true});};
  if(!allowed)return <main className="editor-shell"><h1>News editor</h1><p>{message}</p><Button variant="outline" onClick={signOut}><LogOut/> Sign out</Button></main>;
  return <main className="editor-shell"><div className="editor-heading"><div><p className="eyebrow">Private publishing</p><h1>News editor</h1></div><Button variant="outline" onClick={signOut}><LogOut/> Sign out</Button></div><div className="editor-layout"><form className="editor-form" onSubmit={(event)=>void save(event)}><div className="editor-form-heading"><h2>{form.id?"Edit article":"New article"}</h2>{form.id&&<Button type="button" variant="outline" size="sm" onClick={()=>setForm(emptyForm)}><Plus/> New</Button>}</div><label>Title<Input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Article title"/></label><label>Web address<Input value={form.slug} onChange={e=>setForm({...form,slug:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,"")})} placeholder={suggestedSlug || "article-title"}/></label><label>Summary<Textarea value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})} placeholder="A short introduction for the News page"/></label><label>Article<Textarea className="min-h-72" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} placeholder="Write the article. Separate paragraphs with a blank line."/></label>{message&&<p className="editor-message" role="status">{message}</p>}<div className="flex flex-wrap gap-3"><Button disabled={saving} type="submit" variant="outline"><Save/> Save draft</Button><Button disabled={saving} type="button" onClick={(event)=>void save(event,"published"=== "published")}>{form.status==="published"?"Update published article":"Publish now"}<ArrowUpRight/></Button>{form.id&&form.status==="published"&&<Button disabled={saving} type="button" variant="outline" onClick={async()=>{await supabase.from("news_posts").update({status:"draft"}).eq("id",form.id);setForm(emptyForm);await load();}}>Unpublish</Button>}</div></form><aside className="editor-posts"><h2>Articles</h2>{posts.length===0?<p>No drafts or articles yet.</p>:posts.map(post=><article key={post.id}><span>{post.status}</span><h3>{post.title}</h3><time>{formatDate(post.published_at)}</time><div><Button size="icon" variant="outline" aria-label={`Edit ${post.title}`} onClick={()=>edit(post)}><Edit3/></Button><Button size="icon" variant="outline" aria-label={`Delete ${post.title}`} onClick={()=>void remove(post.id)}><Trash2/></Button></div></article>)}</aside></div></main>;
}