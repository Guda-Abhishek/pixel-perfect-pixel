import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SYSTEM_PROMPT } from "@/lib/portfolio-chat";
import { getPersonPortfolio } from "@/lib/person-portfolios";

const body = z.object({
  person: z.enum(["ammu", "bava", "sai"]).optional(),
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
        const profile = parsed.data.person ? getPersonPortfolio(parsed.data.person) : undefined;
        if (parsed.data.person && !profile) return Response.json({ error: "Unknown portfolio" }, { status: 400 });
        const profilePrompt = profile
          ? [
              `You are the portfolio assistant for ${profile.name} (${profile.nickname}). Answer visitors' questions in a friendly, concise way (under 150 words) using ONLY the verified portfolio facts below. Never invent employers, dates, metrics, credentials, links, personal details or project details. If a detail is marked to be confirmed or resume pending, say so clearly. For Bava, this is a demo profile: only confirm the B.Tech Information Technology cohort at TKR College of Engineering and Technology and collaboration with Amulya on the major project. Do not infer any unlisted skills, contact details, or achievements. Do not ask for sensitive personal information.`,
              "VERIFIED PORTFOLIO DATA:",
              JSON.stringify({ name: profile.name, headline: profile.headline, story: profile.story, summary: profile.summary, skills: profile.skills, experience: profile.experience, projects: profile.projects, certifications: profile.certifications, education: profile.education, leadership: profile.leadership, training: profile.training, email: profile.email, phone: profile.phone }, null, 2),
            ].join("\\n")
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
