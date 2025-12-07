export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { Webhook } from "svix";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response("Missing webhook secret", { status: 500 });
  }

  const h = await headers();

  const svix_id = h.get("svix-id");
  const svix_timestamp = h.get("svix-timestamp");
  const svix_signature = h.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const body = await req.text();

  let evt: any; // <--- FIX HERE

  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;
  const data = evt.data;

  // USER CREATED
  if (eventType === "user.created") {
    await supabase.from("profiles").insert({
      clerk_id: data.id,
      email: data.email_addresses?.[0]?.email_address ?? null,
      full_name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
      role: "user",
    });
  }

  return new Response("OK", { status: 200 });
}