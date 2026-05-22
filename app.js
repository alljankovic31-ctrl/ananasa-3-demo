const SUPABASE_URL = "https://qbxgufrfnwaasaotrfmj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_rrpZQ5j2zetb848sT1g90Q_R0LNIsAt";

const eventImages = [
  "https://media.base44.com/images/public/6a0f6ab8b7a925941d91c273/a57a11a0a_2025-12-05.webp",
  "https://media.base44.com/images/public/6a0f6ab8b7a925941d91c273/5aee51ef8_2025-05-073.webp",
  "https://media.base44.com/images/public/6a0f6ab8b7a925941d91c273/e0248ecc3_unnamed3.webp",
];

const fallbackEvents = [
  {
    id: null,
    title: "Tropical Friday",
    event_date: "",
    start_time: "22:30",
    description: "House set and signature cocktails",
    image_url: eventImages[0],
  },
  {
    id: null,
    title: "Pineapple Sessions",
    event_date: "",
    start_time: "23:00",
    description: "DJ duo and late lounge",
    image_url: eventImages[1],
  },
  {
    id: null,
    title: "Cocktail Social",
    event_date: "",
    start_time: "20:00",
    description: "Bar tasting and relaxed groove",
    image_url: eventImages[2],
  },
];

const fallbackTables = [
  { table_number: "1", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "14%", map_top: "14%" },
  { table_number: "2", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "14%", map_top: "23%" },
  { table_number: "3", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "14%", map_top: "32%" },
  { table_number: "4", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "14%", map_top: "41%" },
  { table_number: "5", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "25%", map_top: "48%" },
  { table_number: "6", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "34%", map_top: "48%" },
  { table_number: "7", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "43%", map_top: "48%" },
  { table_number: "8", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "52%", map_top: "48%" },
  { table_number: "9", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "61%", map_top: "48%" },
  { table_number: "10", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "70%", map_top: "48%" },
  { table_number: "11", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "25%", map_top: "88%" },
  { table_number: "12", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "35%", map_top: "88%" },
  { table_number: "13", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "45%", map_top: "88%" },
  { table_number: "14", floor: "sank", capacity: 1, zone: "Barska stolica", map_left: "55%", map_top: "88%" },
  { table_number: "15", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "68%", map_top: "84%" },
  { table_number: "16", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "42%", map_top: "84%" },
  { table_number: "17", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "10%", map_top: "84%" },
  { table_number: "18", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "11%", map_top: "53%" },
  { table_number: "19", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "35%", map_top: "10%" },
  { table_number: "20", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "46%", map_top: "10%" },
  { table_number: "21", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "58%", map_top: "10%" },
  { table_number: "22", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "70%", map_top: "10%" },
  { table_number: "23", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "82%", map_top: "10%" },
  { table_number: "24", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "88%", map_top: "37%" },
  { table_number: "25", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "88%", map_top: "54%" },
  { table_number: "26", floor: "sprat", capacity: 4, zone: "Sprat", map_left: "88%", map_top: "70%" },
].map((table) => ({ id: null, is_vip: false, ...table }));

const vipPackages = [
  {
    name: "Gold Package",
    price: "25,000 RSD",
    detail: "Premium sto, boca za pocetak i prioritetno sedenje.",
    features: ["4-6 gostiju", "Bottle service", "Host potvrda"],
  },
  {
    name: "Platinum Package",
    price: "50,000 RSD",
    detail: "Dve boce, champagne momenat i ulazak bez cekanja.",
    features: ["6-8 gostiju", "Champagne", "Priority entry"],
  },
  {
    name: "Diamond Package",
    price: "100,000 RSD",
    detail: "Najjaci sto, puni bottle service i posebna paznja ekipe.",
    features: ["8-10 gostiju", "Sparkler show", "Concierge"],
  },
];

const gallery = [
  ["Pineapple cocktail show", "https://media.base44.com/images/public/6a0f6ab8b7a925941d91c273/b2779a528_2025-05-071.jpg", "wide tall"],
  ["Bar shelves", "https://media.base44.com/images/public/6a0f6ab8b7a925941d91c273/99e62382b_unnamed5.webp", ""],
  ["Bartender and guest", "https://media.base44.com/images/public/6a0f6ab8b7a925941d91c273/3f53d7114_unnamed4.webp", ""],
  ["Crystal cocktails", "https://media.base44.com/images/public/6a0f6ab8b7a925941d91c273/e0248ecc3_unnamed3.webp", "wide"],
  ["Flamingo vibes", "https://media.base44.com/images/public/6a0f6ab8b7a925941d91c273/5b6193f98_2024-11-27.webp", ""],
  ["Tropical lounge", "https://media.base44.com/images/public/6a0f6ab8b7a925941d91c273/dd4a42c11_unnamed2.webp", ""],
];

const eventGrid = document.querySelector("#event-grid");
const floorStage = document.querySelector(".floor-stage");
const floorTabs = document.querySelectorAll("[data-floor]");
const floorPlans = document.querySelectorAll("[data-floor-plan]");
const tableMaps = {
  sank: document.querySelector("#table-map-sank"),
  sprat: document.querySelector("#table-map-sprat"),
};
const vipGrid = document.querySelector("#vip-grid");
const galleryGrid = document.querySelector("#gallery-grid");
const modal = document.querySelector("#action-modal");
const modalContent = document.querySelector("#modal-content");
const selectedTitle = document.querySelector("#selected-table-title");
const selectedCopy = document.querySelector("#selected-table-copy");
const reserveSelected = document.querySelector("#reserve-selected");
const guestForm = document.querySelector("#guest-form");
const guestEvent = document.querySelector("#guest-event");
const toast = document.querySelector("#toast");
const mapControls = document.querySelector(".map-controls");

let events = fallbackEvents;
let tables = fallbackTables;
let selectedTable = null;
const mapViews = {
  sank: { x: 0, y: 0, scale: 1 },
  sprat: { x: 0, y: 0, scale: 1 },
};
const mapPointers = new Map();
let mapDrag = null;
let mapPinch = null;

function showToast(message, tone = "success") {
  toast.dataset.tone = tone;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function openModal(markup) {
  modalContent.innerHTML = markup;
  modal.showModal();
}

function closeModal() {
  modal.close();
  modalContent.innerHTML = "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function eventDateLabel(event) {
  if (!event.event_date) return event.start_time || "Uskoro";
  const date = new Date(`${event.event_date}T12:00:00`);
  const day = new Intl.DateTimeFormat("sr-RS", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
  return `${day}${event.start_time ? `, ${event.start_time.slice(0, 5)}` : ""}`;
}

function eventOptions(selectedId = "") {
  return events
    .map(
      (event) =>
        `<option value="${escapeHtml(event.id ?? "")}" data-date="${escapeHtml(event.event_date)}" ${
          String(event.id ?? "") === String(selectedId) ? "selected" : ""
        }>${escapeHtml(event.title)} - ${escapeHtml(eventDateLabel(event))}</option>`,
    )
    .join("");
}

async function supabaseRequest(table, { method = "GET", query = "", body } = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    method,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(method === "POST" ? { Prefer: "return=minimal" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Supabase ${method} request failed.`);
  }

  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function renderEvents() {
  eventGrid.innerHTML = events
    .map(
      (event, index) => `
        <article class="event-card">
          <img src="${escapeHtml(event.image_url || eventImages[index % eventImages.length])}" alt="${escapeHtml(event.title)}" />
          <div class="event-body">
            <div class="event-top">
              <div>
                <p class="eyebrow">${escapeHtml(eventDateLabel(event))}</p>
                <h3>${escapeHtml(event.title)}</h3>
              </div>
              <span class="pill">RSVP</span>
            </div>
            <p class="event-meta">${escapeHtml(event.description || "Rezervisi mesto za sledece vece.")}</p>
            <button class="button secondary" type="button" data-rsvp="${escapeHtml(event.id ?? "")}">Prijavi dolazak</button>
          </div>
        </article>
      `,
    )
    .join("");

  guestEvent.innerHTML = eventOptions();
}

function tableKey(value) {
  return String(value ?? "").replace(/^0+/, "") || "0";
}

function tableName(table) {
  return table.zone === "Barska stolica" ? `Barska stolica ${table.table_number}` : `Sto ${table.table_number}`;
}

function guestCapacityLabel(table) {
  return table.capacity === 1 ? "1 mesto" : `${table.capacity} mesta`;
}

function isBarSeat(table) {
  return table.zone === "Barska stolica";
}

function tableStatus(table) {
  const rawStatus = String(table.availability_status || table.availability || table.status || "").toLowerCase();
  if (table.is_reserved || ["reserved", "busy", "booked", "confirmed"].includes(rawStatus)) return "reserved";
  return "available";
}

function tableMarkup(table) {
  const placeLabel = guestCapacityLabel(table);
  const status = tableStatus(table);
  const statusLabel = status === "reserved" ? "Zauzeto" : "Slobodno";
  return `
        <button
          class="table ${isBarSeat(table) ? "bar-seat" : "venue-table"} ${table.is_vip ? "vip" : ""} ${status}"
          type="button"
          style="left:${escapeHtml(table.map_left || "10%")};top:${escapeHtml(table.map_top || "10%") }"
          data-table="${escapeHtml(table.table_number)}"
          data-status="${escapeHtml(status)}"
          aria-label="${escapeHtml(tableName(table))}, ${escapeHtml(guestCapacityLabel(table))}, ${escapeHtml(table.zone)}${
            table.is_vip ? ", VIP" : ""
          }, ${escapeHtml(statusLabel)}"
          ${status === "reserved" ? "disabled" : ""}
        >
          <strong>${escapeHtml(table.table_number)}</strong>
          <span>${table.is_vip ? "VIP" : isBarSeat(table) ? "Stolica" : placeLabel}</span>
        </button>
      `;
}

function renderTables() {
  Object.entries(tableMaps).forEach(([floor, map]) => {
    map.innerHTML = tables.filter((table) => table.floor === floor).map(tableMarkup).join("");
  });
}

function showFloor(floor) {
  floorTabs.forEach((tab) => {
    const active = tab.dataset.floor === floor;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  floorPlans.forEach((plan) => plan.classList.toggle("active", plan.dataset.floorPlan === floor));
  applyMapView(floor);
}

function activeFloor() {
  return document.querySelector(".venue-plan.active")?.dataset.floorPlan || "sank";
}

function activePlan() {
  return document.querySelector(".venue-plan.active");
}

function clampMapScale(scale) {
  return Math.min(1.72, Math.max(0.92, scale));
}

function applyMapView(floor = activeFloor()) {
  const plan = document.querySelector(`[data-floor-plan="${floor}"]`);
  const view = mapViews[floor];
  if (!plan || !view) return;
  plan.style.setProperty("--map-x", `${view.x}px`);
  plan.style.setProperty("--map-y", `${view.y}px`);
  plan.style.setProperty("--map-scale", String(view.scale));
  plan.classList.toggle("zoomed", view.scale > 1.02 || Math.abs(view.x) > 2 || Math.abs(view.y) > 2);
}

function zoomMap(delta) {
  const floor = activeFloor();
  mapViews[floor].scale = clampMapScale(mapViews[floor].scale + delta);
  applyMapView(floor);
}

function resetMapView(floor = activeFloor()) {
  mapViews[floor] = { x: 0, y: 0, scale: 1 };
  applyMapView(floor);
}

function renderStaticSections() {
  vipGrid.innerHTML = vipPackages
    .map(
      (pkg) => `
        <article class="package-card" tabindex="0" role="button" data-package="${escapeHtml(pkg.name)}">
          <div class="package-top">
            <div>
              <p class="eyebrow">Ananasa VIP</p>
              <h3>${escapeHtml(pkg.name)}</h3>
            </div>
            <span class="price">${escapeHtml(pkg.price)}</span>
          </div>
          <p>${escapeHtml(pkg.detail)}</p>
          <div class="feature-list">${pkg.features.map((feature) => `<span>${escapeHtml(feature)}</span>`).join("")}</div>
        </article>
      `,
    )
    .join("");

  galleryGrid.innerHTML = gallery
    .map(
      ([label, url, size]) => `
        <button class="gallery-button ${escapeHtml(size)}" type="button" data-gallery-label="${escapeHtml(label)}" data-gallery-url="${escapeHtml(url)}">
          <img src="${escapeHtml(url)}" alt="${escapeHtml(label)}" />
        </button>
      `,
    )
    .join("");
}

function bookingForm({ mode, title, intro, submitLabel, selectedEventId = "" }) {
  const reservationCapacity = selectedTable?.capacity || 12;
  const selectedGuests = mode === "reservation" ? Math.min(reservationCapacity, 4) : 4;
  return `
    <div class="modal-stack">
      <p class="eyebrow">Booking</p>
      <h3>${escapeHtml(title)}</h3>
      <p class="muted">${escapeHtml(intro)}</p>
      <form class="modal-form two" data-booking-form data-mode="${escapeHtml(mode)}">
        <label>Ime<input name="name" autocomplete="name" required placeholder="Ime i prezime" /></label>
        <label>Telefon<input name="phone" autocomplete="tel" required placeholder="+381..." /></label>
        ${
          mode === "guest"
            ? ""
            : `<label class="${mode === "reservation" ? "wide" : ""}">Email<input name="email" autocomplete="email" type="email" placeholder="email@example.com" /></label>`
        }
        <label>Dogadjaj<select name="event" required>${eventOptions(selectedEventId)}</select></label>
        <label>Broj gostiju<input name="guests" type="number" min="1" max="${
          mode === "reservation" ? escapeHtml(reservationCapacity) : "12"
        }" value="${escapeHtml(selectedGuests)}" required /></label>
        <label class="wide">Napomena<textarea name="note" placeholder="Rodjendan, omiljeni sto, posebna boca..."></textarea></label>
        <button class="button primary wide" type="submit">${escapeHtml(submitLabel)}</button>
      </form>
    </div>
  `;
}

async function loadSupabaseData() {
  try {
    const [databaseEvents, databaseTables] = await Promise.all([
      supabaseRequest("events", {
        query: "?select=id,title,event_date,start_time,description,image_url,status&status=eq.upcoming&order=event_date.asc",
      }),
      supabaseRequest("venue_tables", {
        query: "?select=id,table_number,zone,capacity,is_vip,map_left,map_top&is_active=eq.true&order=table_number.asc",
      }),
    ]);

    if (databaseEvents.length) events = databaseEvents;
    if (databaseTables.length) {
      const databaseTablesByNumber = new Map(databaseTables.map((table) => [tableKey(table.table_number), table]));
      tables = fallbackTables.map((layoutTable) => ({
        ...layoutTable,
        ...databaseTablesByNumber.get(tableKey(layoutTable.table_number)),
        ...(layoutTable.floor === "sank" && Number(layoutTable.table_number) <= 14
          ? { zone: "Barska stolica", capacity: 1 }
          : {}),
        floor: layoutTable.floor,
        map_left: layoutTable.map_left,
        map_top: layoutTable.map_top,
      }));
    }
    renderEvents();
    renderTables();
  } catch (error) {
    console.error(error);
    renderEvents();
    renderTables();
    showToast("Baza trenutno nije dostupna. Prikazujem demo podatke.", "warning");
  }
}

async function submitGuestList(formData, selectedEventId) {
  await supabaseRequest("guest_list_entries", {
    method: "POST",
    body: {
      guest_name: formData.get("name").trim(),
      guest_phone: formData.get("phone").trim(),
      event_id: Number(selectedEventId),
      party_size: Number(formData.get("guests")),
      status: "pending",
    },
  });
}

async function submitReservation(formData, selectedEvent) {
  await supabaseRequest("reservations", {
    method: "POST",
    body: {
      guest_name: formData.get("name").trim(),
      guest_phone: formData.get("phone").trim(),
      guest_email: formData.get("email").trim() || null,
      event_id: Number(selectedEvent.id),
      table_id: selectedTable.id,
      party_size: Number(formData.get("guests")),
      reservation_date: selectedEvent.event_date || null,
      note: formData.get("note").trim() || null,
      status: "pending",
    },
  });
}

async function submitVipInquiry(formData, selectedEvent, packageName) {
  await supabaseRequest("vip_inquiries", {
    method: "POST",
    body: {
      package_name: packageName,
      guest_name: formData.get("name").trim(),
      guest_phone: formData.get("phone").trim(),
      guest_email: formData.get("email").trim() || null,
      event_id: Number(selectedEvent.id),
      party_size: Number(formData.get("guests")),
      note: formData.get("note").trim() || null,
      status: "pending",
    },
  });
}

function openReservationForSelected() {
  if (!selectedTable) return;
  openModal(
    bookingForm({
      mode: "reservation",
      title: tableName(selectedTable),
      intro: `${selectedTable.zone} za ${guestCapacityLabel(selectedTable)}.`,
      submitLabel: "Posalji rezervaciju",
    }),
  );
}

eventGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-rsvp]");
  if (!button) return;
  const selectedEvent = events.find((item) => String(item.id ?? "") === button.dataset.rsvp);
  openModal(
    bookingForm({
      mode: "guest",
      title: selectedEvent?.title || "Guest list",
      intro: "Prijava se cuva u bazi i ceka potvrdu.",
      submitLabel: "Posalji RSVP",
      selectedEventId: selectedEvent?.id ?? "",
    }),
  );
});

floorStage.addEventListener("click", (event) => {
  const floorTab = event.target.closest("[data-floor]");
  if (floorTab) {
    showFloor(floorTab.dataset.floor);
    return;
  }

  const button = event.target.closest("[data-table]");
  if (!button) return;
  selectedTable = tables.find((table) => tableKey(table.table_number) === tableKey(button.dataset.table));
  document.querySelectorAll(".table").forEach((table) => table.classList.remove("selected"));
  button.classList.add("selected");
  selectedTitle.textContent = tableName(selectedTable);
  selectedCopy.textContent = `${selectedTable.zone}, ${guestCapacityLabel(selectedTable)}${
    selectedTable.is_vip ? ", VIP service dostupan" : ""
  }.`;
  reserveSelected.disabled = false;

  if (window.matchMedia("(max-width: 720px)").matches) {
    openReservationForSelected();
  }
});

mapControls.addEventListener("click", (event) => {
  const control = event.target.closest("[data-map-action]");
  if (!control) return;
  if (control.dataset.mapAction === "zoom-in") zoomMap(0.16);
  if (control.dataset.mapAction === "zoom-out") zoomMap(-0.16);
  if (control.dataset.mapAction === "reset") resetMapView();
});

function pointerDistance(first, second) {
  return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
}

floorPlans.forEach((plan) => {
  plan.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".table")) return;
    plan.setPointerCapture(event.pointerId);
    mapPointers.set(event.pointerId, event);
    const floor = plan.dataset.floorPlan;
    const view = mapViews[floor];

    if (mapPointers.size === 1) {
      mapDrag = { floor, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: view.x, y: view.y };
    }

    if (mapPointers.size === 2) {
      const [first, second] = [...mapPointers.values()];
      mapPinch = { floor, distance: pointerDistance(first, second), scale: view.scale };
      mapDrag = null;
    }
  });

  plan.addEventListener("pointermove", (event) => {
    if (!mapPointers.has(event.pointerId)) return;
    mapPointers.set(event.pointerId, event);
    const floor = plan.dataset.floorPlan;
    const view = mapViews[floor];

    if (mapPointers.size === 2 && mapPinch?.floor === floor) {
      const [first, second] = [...mapPointers.values()];
      view.scale = clampMapScale(mapPinch.scale * (pointerDistance(first, second) / mapPinch.distance));
      applyMapView(floor);
      return;
    }

    if (mapDrag?.pointerId === event.pointerId && mapDrag.floor === floor) {
      view.x = mapDrag.x + event.clientX - mapDrag.startX;
      view.y = mapDrag.y + event.clientY - mapDrag.startY;
      applyMapView(floor);
    }
  });

  const stopMapPointer = (event) => {
    mapPointers.delete(event.pointerId);
    if (mapDrag?.pointerId === event.pointerId) mapDrag = null;
    if (mapPointers.size < 2) mapPinch = null;
  };

  plan.addEventListener("pointerup", stopMapPointer);
  plan.addEventListener("pointercancel", stopMapPointer);
});

reserveSelected.addEventListener("click", () => {
  openReservationForSelected();
});

vipGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-package]");
  if (!card) return;
  const pkg = vipPackages.find((item) => item.name === card.dataset.package);
  openModal(
    bookingForm({
      mode: "vip",
      title: pkg.name,
      intro: `${pkg.detail} Cena paketa: ${pkg.price}`,
      submitLabel: "Posalji VIP upit",
    }),
  );
  modal.querySelector("[data-booking-form]").dataset.package = pkg.name;
});

vipGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-package]");
  if (card) card.click();
});

galleryGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-gallery-url]");
  if (!button) return;
  openModal(`
    <div class="modal-stack">
      <img class="lightbox-image" src="${escapeHtml(button.dataset.galleryUrl)}" alt="${escapeHtml(button.dataset.galleryLabel)}" />
      <p class="muted">${escapeHtml(button.dataset.galleryLabel)}</p>
    </div>
  `);
});

modal.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-booking-form]");
  if (!form) return;
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  const selectedEvent = events.find((item) => String(item.id ?? "") === String(formData.get("event")));

  if (!selectedEvent?.id) {
    showToast("Dogadjaj jos nije spreman u bazi. Pokusaj ponovo.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Saljem...";

  try {
    if (form.dataset.mode === "guest") {
      await submitGuestList(formData, selectedEvent.id);
      showToast("RSVP prijava je sacuvana.");
    } else if (form.dataset.mode === "reservation") {
      await submitReservation(formData, selectedEvent);
      showToast("Rezervacija je poslata i ceka potvrdu.");
    } else if (form.dataset.mode === "vip") {
      await submitVipInquiry(formData, selectedEvent, form.dataset.package);
      showToast("VIP upit je poslat i ceka potvrdu.");
    }
    closeModal();
  } catch (error) {
    console.error(error);
    submitButton.disabled = false;
    submitButton.textContent = "Pokusaj ponovo";
    showToast("Slanje nije uspelo. Provericemo bazu i pravila pristupa.", "error");
  }
});

guestForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(guestForm);
  const submitButton = guestForm.querySelector('button[type="submit"]');
  const selectedEventId = formData.get("event");

  submitButton.disabled = true;
  submitButton.textContent = "Saljem...";

  try {
    await submitGuestList(formData, selectedEventId);
    guestForm.reset();
    guestEvent.selectedIndex = 0;
    showToast("Guest list prijava je sacuvana.");
  } catch (error) {
    console.error(error);
    showToast("Guest list prijava nije poslata.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Posalji prijavu";
  }
});

document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

const menuToggle = document.querySelector(".menu-toggle");
const headerNav = document.querySelector(".site-header nav");
const navLinks = document.querySelectorAll("[data-nav-link]");
const navSections = document.querySelectorAll("main section[id]");

function setActiveNav(id) {
  navLinks.forEach((link) => {
    const active = link.dataset.navLink === id;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function moveToHash(link) {
  const target = document.querySelector(link.hash);
  if (!target) return;
  const update = () => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", link.hash);
    setActiveNav(target.id);
  };

  if (document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

menuToggle.addEventListener("click", () => {
  const open = headerNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

headerNav.addEventListener("click", () => {
  headerNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!link.hash) return;
    event.preventDefault();
    moveToHash(link);
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      .slice(0, 1)
      .forEach((entry) => setActiveNav(entry.target.id));
  },
  { rootMargin: "-22% 0px -58%", threshold: [0.12, 0.32, 0.6] },
);

navSections.forEach((section) => sectionObserver.observe(section));
setActiveNav(location.hash.slice(1) || "home");

renderStaticSections();
renderEvents();
renderTables();
showFloor("sank");
loadSupabaseData();
