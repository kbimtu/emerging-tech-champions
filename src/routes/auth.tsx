import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EDITOR_EMAIL = "info@i2ol.org";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({ next: typeof search["next"] === "string" && search["next"].startsWith("/") ? search["next"] : "/news/editor" }),
  head: () => ({ meta: [{ title: "News Editor Sign In | i2OL" },{ name:"description",content:"Private sign-in for the i2OL News editor."},{property:"og:title",content:"News Editor Sign In | i2OL"},{property:"og:description",content:"Private sign-in for the i2OL News editor."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}] }),
  component: AuthPage,
});

function AuthPage(){const {next}=Route.useSearch();const navigate=useNavigate();const [password,setPassword]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);useEffect(()=>{void supabase.auth.getUser().then(({data})=>{if(data.user?.email?.toLowerCase()===EDITOR_EMAIL)void navigate({to:next});else if(data.user)void supabase.auth.signOut();});},[navigate,next]);const submit=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setMessage("");const {error}=await supabase.auth.signInWithPassword({email:EDITOR_EMAIL,password});setBusy(false);if(error){setMessage("The email or password is incorrect.");return;}await navigate({to:next});};return <main className="auth-shell"><div className="auth-panel"><p className="eyebrow">Private publishing</p><h1>Content editor sign in</h1><p>Only info@i2ol.org can access publishing and directory controls.</p><form onSubmit={e=>void submit(e)}><label>Email<Input type="email" value={EDITOR_EMAIL} readOnly aria-readonly="true"/></label><label>Password<Input type="password" required minLength={8} autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></label>{message&&<p className="editor-message" role="status">{message}</p>}<Button disabled={busy} type="submit" className="w-full"><Mail/> {busy?"Please wait…":"Sign in"}</Button></form></div></main>}