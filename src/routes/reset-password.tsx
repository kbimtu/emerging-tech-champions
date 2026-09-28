import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Set News Editor Password | i2OL" },
    { name: "description", content: "Set the password for the private i2OL News editor." },
    { property: "og:title", content: "Set News Editor Password | i2OL" },
    { property: "og:description", content: "Set the password for the private i2OL News editor." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("Checking your secure link…");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const isRecovery = hash.get("type") === "recovery" || hash.get("type") === "invite";
    void supabase.auth.getUser().then(({ data }) => {
      const allowed = isRecovery && data.user?.email?.toLowerCase() === "info@i2ol.org";
      setReady(allowed);
      setMessage(allowed ? "Choose a new password for info@i2ol.org." : "This password link is invalid or has expired.");
    });
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) { setMessage("The passwords do not match."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setMessage(error.message); return; }
    await navigate({ to: "/news/editor", replace: true });
  };

  return <main className="auth-shell"><div className="auth-panel"><p className="eyebrow">Private publishing</p><h1>Set editor password</h1><p>{message}</p>{ready&&<form onSubmit={event=>void submit(event)}><label>New password<Input type="password" minLength={8} required autoComplete="new-password" value={password} onChange={event=>setPassword(event.target.value)}/></label><label>Confirm password<Input type="password" minLength={8} required autoComplete="new-password" value={confirmPassword} onChange={event=>setConfirmPassword(event.target.value)}/></label><Button disabled={busy} type="submit" className="w-full"><KeyRound/> {busy?"Saving…":"Save password"}</Button></form>}</div></main>;
}