const SUPABASE_URL = "https://qbxgufrfnwaasaotrfmj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_rrpZQ5j2zetb848sT1g90Q_R0LNIsAt";
const SESSION_KEY = "ananasa-admin-session";
const requestConfig = {
  reservations: {
    label: "Rezervacija",
    table: "reservations",
    list: document.querySelector("#reservation-list"),
    count: document.querySelector("#reservation-count"),
  },
  guestList: {
    label: "Guest list",
    table: "guest_list_entries",
    list: document.querySelector("#guest-list"),
    count: document.querySelector("#guest-count"),
  },
  vip: {
    label: "VIP upit",
    table: "vip_inquiries",
    list: document.querySelector("#vip-list"),
    count: document.querySelector("#vip-count"),
  },
};

const loginBand = document.querySelector("#login-band");
const dashboard = document.querySelector("#admin-dashboard");
const loginForm = document.querySelector("#admin-login");
const signOutButton = document.querySelector("#sign-out");
const refreshButton = document.querySelector("#refresh-admin");
const adminToast = document.querySelector("#admin-toast");
let session = loadSession();
let eventMap = new Map();
let tableMap = new Map();

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function showAdminToast(message, tone = "success") {
  adminToast.dataset.tone = tone;
  adminToast.textContent = message;
  adminToast.classList.add("show");
  window.clearTimeout(showAdminToast.timer);
  showAdminToast.timer = window.setTimeout(() => adminToast.classList.remove("show"), 3400);
}

function loadSession() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(SESSION_KEY));
    return stored?.accessToken && stored?.expiresAt > Date.now() ? stored : null;
  } catch (error) {
    return null;
  }
}

function saveSession(payload) {
  session = {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: Date.now() + payload.expires_in * 1000,
    userEmail: payload.user?.email || "",
  };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  session = null;
  window.localStorage.removeItem(SESSION_KEY);
}

async function parseResponse(response) {
  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || `Supabase request failed with ${response.status}.`);
  }
  return text ? JSON.parse(text) : null;
}

async function signIn(email, password) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return parseResponse(response);
}

async function restRequest(table, { method = "GET", query = "", body } = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    method,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(method === "PATCH" ? { Prefer: "return=representation" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return parseResponse(response);
}

function formatEvent(eventId) {
  const event = eventMap.get(Number(eventId));
  if (!event) return `Dogadjaj #${eventId || "-"}`;
  const day = new Intl.DateTimeFormat("sr-RS", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${event.event_date}T12:00:00`));
  return `${event.title} - ${day}`;
}

function formatPhoneLink(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("381")) return digits;
  if (digits.startsWith("0")) return `381${digits.slice(1)}`;
  return digits;
}

function confirmationMessage(item, kind) {
  const eventLabel = formatEvent(item.event_id);
  const tableLabel = item.table_id ? ` Sto ${tableMap.get(Number(item.table_id))?.table_number || item.table_id}.` : "";
  if (kind === "guestList") {
    return `Zdravo ${item.guest_name}, potvrdjena je guest list prijava za ${eventLabel}. Vidimo se u Ananasa 3.`;
  }
  if (kind === "vip") {
    return `Zdravo ${item.guest_name}, primili smo VIP upit za ${eventLabel}. Javljamo potvrdu detalja za ${item.package_name || "VIP paket"}.`;
  }
  return `Zdravo ${item.guest_name}, rezervacija za ${eventLabel} je potvrdjena.${tableLabel} Vidimo se u Ananasa 3.`;
}

function contactLinks(item, kind) {
  const message = confirmationMessage(item, kind);
  const whatsappPhone = formatPhoneLink(item.guest_phone);
  const whatsappHref = whatsappPhone ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}` : "";
  const mailHref = item.guest_email
    ? `mailto:${encodeURIComponent(item.guest_email)}?subject=${encodeURIComponent("Ananasa 3 potvrda")}&body=${encodeURIComponent(message)}`
    : "";
  return `
    <div class="contact-actions">
      <a class="contact-link ${whatsappHref ? "" : "disabled"}" href="${escapeHtml(whatsappHref || "#")}" target="_blank" rel="noreferrer">WhatsApp</a>
      <a class="contact-link ${mailHref ? "" : "disabled"}" href="${escapeHtml(mailHref || "#")}">Email</a>
    </div>
  `;
}

function statusLabel(status) {
  return status || "pending";
}

function renderRequest(kind, item) {
  const table = item.table_id ? tableMap.get(Number(item.table_id)) : null;
  const note = item.note ? `<p>${escapeHtml(item.note)}</p>` : "";
  const email = item.guest_email ? `<small>${escapeHtml(item.guest_email)}</small>` : "";
  const packageLine = item.package_name ? `<p><strong>${escapeHtml(item.package_name)}</strong></p>` : "";
  const tableLine = table ? `Sto ${escapeHtml(table.table_number)} - ${escapeHtml(table.zone)}` : "";
  return `
    <article class="request-row" data-request-kind="${escapeHtml(kind)}" data-request-id="${escapeHtml(item.id)}">
      <div>
        <h2>${escapeHtml(item.guest_name || "Bez imena")}</h2>
        <p>${escapeHtml(item.guest_phone || "Bez telefona")}</p>
        ${email}
      </div>
      <div class="request-meta">
        <p><strong>${escapeHtml(formatEvent(item.event_id))}</strong></p>
        <p>${escapeHtml([tableLine, item.party_size ? `${item.party_size} gostiju` : ""].filter(Boolean).join(" - "))}</p>
        ${packageLine}
        ${note}
      </div>
      <div class="request-controls">
        <span class="status-pill" data-status="${escapeHtml(statusLabel(item.status))}">${escapeHtml(statusLabel(item.status))}</span>
        <div class="request-actions">
          <button class="button primary compact-button" type="button" data-status-action="confirmed">Potvrdi</button>
          <button class="button secondary compact-button" type="button" data-status-action="rejected">Odbij</button>
        </div>
        ${contactLinks(item, kind)}
      </div>
    </article>
  `;
}

function renderList(kind, items) {
  const config = requestConfig[kind];
  config.count.textContent = String(items.length);
  config.list.innerHTML = items.length
    ? items.map((item) => renderRequest(kind, item)).join("")
    : `<p class="request-empty">Nema novih stavki.</p>`;
}

async function loadReferenceData() {
  const [events, tables] = await Promise.all([
    restRequest("events", { query: "?select=id,title,event_date&order=event_date.desc" }),
    restRequest("venue_tables", { query: "?select=id,table_number,zone&order=table_number.asc" }),
  ]);
  eventMap = new Map(events.map((event) => [Number(event.id), event]));
  tableMap = new Map(tables.map((table) => [Number(table.id), table]));
}

async function loadRequests() {
  refreshButton.disabled = true;
  try {
    await loadReferenceData();
    const [reservations, guestList, vip] = await Promise.all([
      restRequest("reservations", { query: "?select=*&order=id.desc&limit=80" }),
      restRequest("guest_list_entries", { query: "?select=*&order=id.desc&limit=80" }),
      restRequest("vip_inquiries", { query: "?select=*&order=id.desc&limit=80" }),
    ]);
    renderList("reservations", reservations);
    renderList("guestList", guestList);
    renderList("vip", vip);
  } finally {
    refreshButton.disabled = false;
  }
}

async function updateStatus(kind, id, status) {
  const config = requestConfig[kind];
  await restRequest(config.table, {
    method: "PATCH",
    query: `?id=eq.${encodeURIComponent(id)}`,
    body: { status },
  });
  showAdminToast(`${config.label} je ${status === "confirmed" ? "potvrdjena" : "odbijena"}.`);
  await loadRequests();
}

function showDashboard() {
  loginBand.hidden = true;
  dashboard.hidden = false;
  signOutButton.hidden = false;
}

function showLogin() {
  loginBand.hidden = false;
  dashboard.hidden = true;
  signOutButton.hidden = true;
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = loginForm.querySelector('button[type="submit"]');
  const formData = new FormData(loginForm);
  button.disabled = true;
  button.textContent = "Ulazim...";
  try {
    const payload = await signIn(formData.get("email").trim(), formData.get("password"));
    saveSession(payload);
    showDashboard();
    await loadRequests();
  } catch (error) {
    console.error(error);
    showAdminToast("Prijava nije uspela ili nalog nema admin pristup.", "error");
  } finally {
    button.disabled = false;
    button.textContent = "Prijavi se";
  }
});

signOutButton.addEventListener("click", () => {
  clearSession();
  showLogin();
  showAdminToast("Odjavljen si.");
});

refreshButton.addEventListener("click", async () => {
  if (!session) return;
  try {
    await loadRequests();
    showAdminToast("Podaci su osvezeni.");
  } catch (error) {
    console.error(error);
    showAdminToast("Osvezavanje nije uspelo.", "error");
  }
});

document.querySelector(".admin-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-admin-tab]");
  if (!button) return;
  document.querySelectorAll(".admin-tab").forEach((tab) => tab.classList.toggle("active", tab === button));
  document.querySelectorAll(".admin-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.adminPanel === button.dataset.adminTab);
  });
});

document.querySelectorAll(".request-list").forEach((list) => {
  list.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-status-action]");
    if (!button) return;
    const row = button.closest("[data-request-kind]");
    button.disabled = true;
    try {
      await updateStatus(row.dataset.requestKind, row.dataset.requestId, button.dataset.statusAction);
    } catch (error) {
      console.error(error);
      showAdminToast("Status nije sacuvan.", "error");
      button.disabled = false;
    }
  });
});

if (session) {
  showDashboard();
  loadRequests().catch((error) => {
    console.error(error);
    clearSession();
    showLogin();
    showAdminToast("Admin sesija je istekla.", "error");
  });
} else {
  showLogin();
}
