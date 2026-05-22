import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
const fromEmail = Deno.env.get("CONFIRMATION_FROM_EMAIL") ?? "";

type RequestKind = "reservation" | "guest-list" | "vip";

type SendPayload = {
  id?: number;
  kind?: RequestKind;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function assertConfigured() {
  if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !fromEmail) {
    throw new Error("Email function secrets are not configured.");
  }
}

function tableFor(kind: RequestKind) {
  if (kind === "reservation") return "reservations";
  if (kind === "guest-list") return "guest_list_entries";
  return "vip_inquiries";
}

function reservationEmail(request: Record<string, unknown>, event: Record<string, unknown>, table?: Record<string, unknown>) {
  const tableCopy = table ? `<p>Sto: <strong>${table.table_number}</strong> - ${table.zone}</p>` : "";
  return {
    subject: "Ananasa 3 - rezervacija je potvrdjena",
    html: `
      <div style="font-family:Arial,sans-serif;color:#22160f;line-height:1.6">
        <h1>Rezervacija je potvrdjena</h1>
        <p>Zdravo ${request.guest_name},</p>
        <p>Potvrdili smo tvoju rezervaciju za <strong>${event.title}</strong>.</p>
        <p>Datum: <strong>${event.event_date}</strong></p>
        <p>Broj gostiju: <strong>${request.party_size}</strong></p>
        ${tableCopy}
        <p>Vidimo se u Ananasa 3.</p>
      </div>
    `,
  };
}

function guestListEmail(request: Record<string, unknown>, event: Record<string, unknown>) {
  return {
    subject: "Ananasa 3 - guest list prijava je potvrdjena",
    html: `
      <div style="font-family:Arial,sans-serif;color:#22160f;line-height:1.6">
        <h1>Guest list je potvrdjena</h1>
        <p>Zdravo ${request.guest_name},</p>
        <p>Potvrdili smo guest list prijavu za <strong>${event.title}</strong>.</p>
        <p>Datum: <strong>${event.event_date}</strong></p>
        <p>Broj gostiju: <strong>${request.party_size}</strong></p>
        <p>Vidimo se u Ananasa 3.</p>
      </div>
    `,
  };
}

function vipEmail(request: Record<string, unknown>, event: Record<string, unknown>) {
  return {
    subject: "Ananasa 3 - VIP upit je primljen",
    html: `
      <div style="font-family:Arial,sans-serif;color:#22160f;line-height:1.6">
        <h1>VIP upit je primljen</h1>
        <p>Zdravo ${request.guest_name},</p>
        <p>Primili smo tvoj VIP upit za <strong>${event.title}</strong>.</p>
        <p>Paket: <strong>${request.package_name}</strong></p>
        <p>Datum: <strong>${event.event_date}</strong></p>
        <p>Javljamo se sa potvrdom detalja.</p>
      </div>
    `,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  try {
    assertConfigured();
    const authorization = req.headers.get("Authorization");
    if (!authorization) return json({ error: "Missing admin session." }, 401);

    const caller = createClient(supabaseUrl, serviceRoleKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false },
    });
    const service = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
    const { data: userData, error: userError } = await caller.auth.getUser();
    if (userError || !userData.user) return json({ error: "Invalid admin session." }, 401);

    const { data: adminData, error: adminError } = await service
      .from("admin_users")
      .select("user_id")
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (adminError || !adminData) return json({ error: "Admin access required." }, 403);

    const body = (await req.json()) as SendPayload;
    if (!body.id || !body.kind) return json({ error: "Missing request id or kind." }, 400);

    const { data: request, error: requestError } = await service
      .from(tableFor(body.kind))
      .select("*")
      .eq("id", body.id)
      .maybeSingle();
    if (requestError || !request) return json({ error: "Request was not found." }, 404);
    if (!request.guest_email) return json({ error: "Guest email is missing." }, 400);

    const { data: event, error: eventError } = await service
      .from("events")
      .select("id,title,event_date")
      .eq("id", request.event_id)
      .maybeSingle();
    if (eventError || !event) return json({ error: "Event was not found." }, 404);

    let table: Record<string, unknown> | undefined;
    if (body.kind === "reservation" && request.table_id) {
      const { data } = await service
        .from("venue_tables")
        .select("id,table_number,zone")
        .eq("id", request.table_id)
        .maybeSingle();
      table = data ?? undefined;
    }

    const content =
      body.kind === "reservation"
        ? reservationEmail(request, event, table)
        : body.kind === "guest-list"
          ? guestListEmail(request, event)
          : vipEmail(request, event);

    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [request.guest_email],
        subject: content.subject,
        html: content.html,
      }),
    });
    const resendBody = await resend.json();
    if (!resend.ok) return json({ error: "Resend rejected the email.", detail: resendBody }, 502);

    return json({ ok: true, email: resendBody });
  } catch (error) {
    return json({ error: error.message || "Email send failed." }, 500);
  }
});
