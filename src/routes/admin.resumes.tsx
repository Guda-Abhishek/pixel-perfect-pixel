import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileLock2, LogOut, ShieldCheck, UploadCloud } from "lucide-react";

export const Route = createFileRoute("/admin/resumes")({
  head: () => ({
    meta: [
      { title: "Private Resume Manager" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: ResumeManager,
});

function ResumeManager() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session", { credentials: "same-origin", cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Not authenticated");
      })
      .catch(() => navigate({ to: "/admin/login", replace: true }))
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, [navigate]);

  async function logout() {
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      await navigate({ to: "/admin/login", replace: true });
      setSigningOut(false);
    }
  }

  if (checking) {
    return <div className="flex min-h-screen items-center justify-center bg-[#09090d] text-sm text-white/60">Verifying private session…</div>;
  }

  return (
    <section className="min-h-screen bg-[#09090d] px-4 py-8 text-white sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-violet-300">Restricted workspace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Resume Manager</h1>
            <p className="mt-2 text-sm text-white/55">Private resume records and controlled publishing.</p>
          </div>
          <button onClick={logout} disabled={signingOut} className="inline-flex min-h-10 items-center gap-2 border border-white/15 px-4 text-sm text-white/75 hover:bg-white/5 disabled:opacity-50">
            <LogOut className="size-4" /> {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["01", "Private source files", "Original PDF and DOCX resumes stay private."],
            ["02", "Review extracted details", "Check names, dates, skills and experience before approval."],
            ["03", "Publish approved data", "Only reviewed portfolio facts should become public."],
          ].map(([number, title, description]) => (
            <article key={number} className="border border-white/10 bg-white/[0.025] p-5">
              <p className="font-mono text-xs text-violet-300">{number}</p>
              <h2 className="mt-4 text-base font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 border border-amber-200/20 bg-amber-100/[0.04] p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center border border-amber-200/20 text-amber-200">
              <UploadCloud className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Secure storage setup required</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
                Authentication is active, but uploads are intentionally not enabled until private persistent storage is configured.
                This prevents original resumes from being written to a public asset folder, lost on redeploy, or accidentally exposed.
              </p>
              <p className="mt-4 text-sm leading-6 text-white/65">
                Next: connect a private object-storage bucket, enforce PDF/DOCX type and size limits, add file listing and deletion,
                then build review and explicit publish actions. Public portfolio pages must consume only approved extracted data.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 border border-emerald-200/15 bg-emerald-100/[0.025] p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" />
          <p className="text-xs leading-5 text-white/55">Protected by an eight-hour signed HttpOnly session. Unauthenticated requests to private admin pages and APIs receive a generic 404.</p>
        </div>
        <p className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          <FileLock2 className="size-3" /> Private workspace · No public navigation
        </p>
      </div>
    </section>
  );
}
