import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import {
  adminAuthConfigured,
  adminCookieHeader,
  clearAdminCookieHeader,
  createAdminCookie,
  isAdminRequest,
  verifyAdminPassword,
} from "./lib/admin-auth";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// Protect every admin path before it reaches TanStack or a route handler.
function normalizedPath(request: Request): string {
  let pathname = new URL(request.url).pathname;
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // A malformed path remains private and is rejected below.
  }
  return pathname.toLowerCase().replace(/\/+$/, "") || "/";
}

function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/") ||
    pathname === "/api/admin" || pathname.startsWith("/api/admin/");
}

const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function privateNotFound(): Response {
  return new Response("Not Found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}

function jsonResponse(body: unknown, status: number, headers?: HeadersInit): Response {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store", "x-content-type-options": "nosniff", ...Object.fromEntries(new Headers(headers)) },
  });
}

async function handleAdminAuth(request: Request): Promise<Response | null> {
  const path = normalizedPath(request);
  if (path === "/api/admin/login" && request.method === "POST") {
    if (!adminAuthConfigured()) {
      console.error("Admin authentication is disabled: required server secrets are missing.");
      return jsonResponse({ error: "Admin authentication is not configured." }, 503);
    }
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return privateNotFound();

    const clientKey = request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const now = Date.now();
    const current = loginAttempts.get(clientKey);
    if (current && current.resetAt > now && current.count >= MAX_LOGIN_ATTEMPTS) {
      return jsonResponse({ error: "Too many attempts. Try again in 15 minutes." }, 429, {
        "retry-after": String(Math.ceil((current.resetAt - now) / 1000)),
      });
    }

    const payload = await request.json().catch(() => null) as { password?: unknown } | null;
    const password = typeof payload?.password === "string" ? payload.password : "";
    const valid = password.length > 0 && password.length <= 1024 && await verifyAdminPassword(password);
    if (!valid) {
      loginAttempts.set(clientKey, current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + LOGIN_WINDOW_MS });
      return jsonResponse({ error: "Invalid credentials." }, 401);
    }

    loginAttempts.delete(clientKey);
    const cookie = await createAdminCookie();
    if (!cookie) return jsonResponse({ error: "Admin authentication is not configured." }, 503);
    return jsonResponse({ ok: true }, 200, {
      "set-cookie": adminCookieHeader(cookie, new URL(request.url).protocol === "https:"),
    });
  }

  if (path === "/api/admin/logout" && request.method === "POST") {
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return privateNotFound();
    if (!(await isAdminRequest(request))) return privateNotFound();
    return jsonResponse({ ok: true }, 200, {
      "set-cookie": clearAdminCookieHeader(new URL(request.url).protocol === "https:"),
    });
  }

  if (path === "/api/admin/session" && request.method === "GET") {
    if (!(await isAdminRequest(request))) return privateNotFound();
    return jsonResponse({ authenticated: true }, 200);
  }

  return null;
}

function privateNotFound(): Response {
  return new Response("Not Found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const path = normalizedPath(request);
    const isAdmin = isAdminPath(path);
    const authResponse = await handleAdminAuth(request);
    if (authResponse) return authResponse;

    // The login page is intentionally the only public admin page. Every other
    // admin URL returns the same generic 404 until a valid signed session exists.
    if (isAdmin && path !== "/admin/login" && !(await isAdminRequest(request))) {
      return privateNotFound();
    }
    if (isAdmin && path === "/admin/login" && request.method !== "GET") {
      return privateNotFound();
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
