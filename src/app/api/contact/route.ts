import { NextResponse } from "next/server";

export const runtime = "nodejs";

const limits = { first: 80, last: 80, email: 254, phone: 40, care: 100, city: 120, msg: 3000 } as const;
type Field = keyof typeof limits;
const allowedCare = new Set(["Personal care assistance", "Companionship and supervision", "Household assistance", "Respite services", "Not sure yet"]);

function input(data: Record<string, unknown>, field: Field): string | null {
  const value = data[field];
  if (typeof value !== "string" || value.length > limits[field]) return null;
  return value.trim();
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 10_000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const data = raw as Record<string, unknown>;
  if (typeof data.website === "string" && data.website.trim()) return NextResponse.json({ ok: true });
  const fields = Object.fromEntries((Object.keys(limits) as Field[]).map(k => [k, input(data, k)])) as Record<Field, string | null>;
  if (Object.values(fields).some(v => v === null) || !fields.first || !fields.last || !fields.email || !fields.phone || !fields.care || !allowedCare.has(fields.care) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !from || !to) {
    console.error("Contact form delivery is not configured.");
    return NextResponse.json({ error: "Online requests are unavailable. Please call or email us directly." }, { status: 503 });
  }
  const body = ["New Steadfast Home Care inquiry", `Name: ${fields.first} ${fields.last}`, `Email: ${fields.email}`, `Phone: ${fields.phone}`, `Care needed: ${fields.care}`, `City: ${fields.city || "Not provided"}`, "", "Message:", fields.msg || "Not provided"].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject: "New care inquiry — Steadfast Home Care", text: body, reply_to: fields.email }),
      cache: "no-store",
    });
    if (!response.ok) { console.error("Email provider rejected a contact submission:", response.status); return NextResponse.json({ error: "Could not send your request. Please call or email us." }, { status: 502 }); }
    return NextResponse.json({ ok: true });
  } catch {
    console.error("Email provider could not be reached.");
    return NextResponse.json({ error: "Could not send your request. Please call or email us." }, { status: 502 });
  }
}
