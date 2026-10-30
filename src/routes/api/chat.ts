import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SYSTEM_PROMPT } from "@/lib/portfolio-chat";
import { getPersonPortfolio } from "@/lib/person-portfolios";

const body = z.object({
  person: z.enum(["abhishek", "ammu", "bava", "sai"]).optional(),
  mode: z.enum(["chat", "intro"]).optional(),
  page: z.string().max(160).optional(),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(2000) }))
    .min(1)
    .max(30),
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });
        const profile = parsed.data.person && parsed.data.person !== "abhishek" ? getPersonPortfolio(parsed.data.person) : undefined;
        if (parsed.data.person && parsed.data.person !== "abhishek" && !profile) return Response.json({ error: "Unknown portfolio" }, { status: 400 });
        const profilePrompt = profile
          ? [
              `You are the portfolio assistant for ${profile.name} (${profile.nickname}). Answer visitors' questions in a friendly, concise way (under 150 words) using ONLY the verified portfolio facts below. Never invent employers, dates, metrics, credentials, links, personal details or project details. If a detail is marked to be confirmed or resume pending, say so clearly. Use the current verified profile data below as the source of truth for each request. The Bava profile now contains Anjini Kumar’s resume-based details; do not treat it as a demo profile. Do not ask for sensitive personal information.`,
              `CURRENT PAGE CONTEXT: ${parsed.data.page ?? "not provided"}`,
              parsed.data.mode === "intro" ? "Create a warm, natural spoken AI introduction of about 90–130 words using the verified profile facts. Introduce professional focus, education, strongest skills, experience, and one or two projects. Make clear this is an AI presenting the portfolio, not the person or a cloned voice. Do not invent facts." : "Answer as a concise, friendly portfolio AI assistant using only the verified facts below. If information is missing, say so.",
              "CURRENT VERIFIED PORTFOLIO DATA (generated from the profile source of truth on every request):",
              JSON.stringify({ name: profile.name, headline: profile.headline, story: profile.story, summary: profile.summary, skills: profile.skills, experience: profile.experience, projects: profile.projects, certifications: profile.certifications, education: profile.education, leadership: profile.leadership, training: profile.training, email: profile.email, phone: profile.phone }, null, 2),
            ].join("\n")
          : SYSTEM_PROMPT;
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return Response.json({ error: "AI not configured" }, { status: 503 });
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "openai/gpt-6-astra",
            stream: true,
            store: false,
            reasoning: { effort: "low" },
            instructions: profilePrompt,
            input: parsed.data.messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => "");
          return Response.json(
            { error: text.slice(0, 300) || "AI request failed" },
            { status: upstream.status || 502 },
          );
        }
        const dec = new TextDecoder();
        const enc = new TextEncoder();
        let buf = "";
        const stream = upstream.body.pipeThrough(
          new TransformStream<Uint8Array, Uint8Array>({
            transform(chunk, ctrl) {
              buf += dec.decode(chunk, { stream: true });
              const lines = buf.split("\n");
              buf = lines.pop() ?? "";
              for (const line of lines) {
                if (!line.startsWith("data:")) continue;
                try {
                  const ev = JSON.parse(line.slice(5).trim());
                  if (ev.type === "response.output_text.delta" && ev.delta)
                    ctrl.enqueue(enc.encode(ev.delta));
                } catch {
                  /* ignore non-JSON */
                }
              }
            },
          }),
        );
        return new Response(stream, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
        });
      },
    },
  },
});
