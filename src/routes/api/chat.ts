import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SYSTEM_PROMPT } from "@/lib/portfolio-chat";

const body = z.object({
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
            instructions: SYSTEM_PROMPT,
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
