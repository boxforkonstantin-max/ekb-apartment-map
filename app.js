import { apartments, projects, developers, budget } from "./data.js";

const rub = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });
const integer = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
const byProject = new Map(projects.map(project => [project.id, project]));

const controls = {
  price: document.querySelector("#price-filter"),
  area: document.querySelector("#area-filter"),
  type: document.querySelector("#type-filter"),
  finish: document.querySelector("#finish-filter"),
  confirmed: document.querySelector("#confirmed-filter"),
  sort: document.querySelector("#sort-filter")
};
const list = document.querySelector("#apartment-list");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");
const details = document.querySelector("#details");
const detailsContent = document.querySelector("#details-content");
const detailsClose = document.querySelector("#details-close");
const backdrop = document.querySelector("#details-backdrop");

let map;
let markers = [];
let selectedApartmentId = null;
let lastFocused = null;

function pricePerMeter(apartment) {
  return Math.round(apartment.price / apartment.area);
}

function isSeparate(apartment) {
  return !apartment.type.toLowerCase().includes("студи");
}

function matches(apartment) {
  if (apartment.price > Number(controls.price.value)) return false;
  if (apartment.area < Number(controls.area.value)) return false;
  if (controls.confirmed.checked && apartment.status !== "confirmed") return false;
  if (controls.type.value === "studio" && isSeparate(apartment)) return false;
  if (controls.type.value === "separate" && !isSeparate(apartment)) return false;
  const finish = apartment.finish.toLowerCase();
  if (controls.finish.value === "ready" && !(finish.includes("чистовая") || finish.includes("комфорт+"))) return false;
  if (controls.finish.value === "prefinish" && !finish.includes("предчистовая")) return false;
  return true;
}

function sorted(items) {
  return [...items].sort((a, b) => {
    if (controls.sort.value === "area") return b.area - a.area || a.price - b.price;
    if (controls.sort.value === "ppm") return pricePerMeter(a) - pricePerMeter(b);
    return a.price - b.price || b.area - a.area;
  });
}

function statusLabel(status) {
  if (status === "confirmed") return "Прямой лот";
  if (status === "related") return "Похожее предложение";
  return "Ориентир — перепроверить";
}

function rowTemplate(apartment) {
  const project = byProject.get(apartment.project);
  const reserveClass = apartment.status === "confirmed" ? "" : " is-reserve";
  const selectedClass = apartment.id === selectedApartmentId ? " is-selected" : "";
  return `
    <button class="apartment-row${reserveClass}${selectedClass}" type="button" data-apartment="${apartment.id}" aria-label="${project.name}, ${apartment.area.toFixed(2)} квадратных метра, ${rub.format(apartment.price)}">
      <span class="apartment-title">
        <strong>${project.name}</strong>
        <span>${apartment.type} · ${apartment.number}</span>
      </span>
      <span class="apartment-price">
        <strong>${rub.format(apartment.price)}</strong>
        <span>${integer.format(pricePerMeter(apartment))} ₽/м²</span>
      </span>
      <span class="apartment-meta">
        <span>${apartment.area.toFixed(2)} м²</span>
        <span>${apartment.floor ? `${apartment.floor} этаж` : "этаж уточнить"}</span>
        <span>${apartment.finish}</span>
        <span>${apartment.deadline}</span>
        <span class="status-pill">${statusLabel(apartment.status)}</span>
      </span>
    </button>`;
}

function getVisible() {
  return sorted(apartments.filter(matches));
}

function render() {
  const visible = getVisible();
  count.textContent = `${visible.length} ${plural(visible.length, "вариант", "варианта", "вариантов")}`;
  list.innerHTML = visible.map(rowTemplate).join("");
  empty.hidden = visible.length !== 0;
  list.hidden = visible.length === 0;
  list.querySelectorAll("[data-apartment]").forEach(button => {
    button.addEventListener("click", () => openDetails(button.dataset.apartment, button));
  });
  renderMarkers(visible);
}

function plural(number, one, few, many) {
  const mod10 = number % 10;
  const mod100 = number % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function createPriceIcon(price, confirmed, selected) {
  const classes = ["price-marker", confirmed ? "" : "reserve", selected ? "selected" : ""].filter(Boolean).join(" ");
  return L.divIcon({
    className: classes,
    html: `<span>${(price / 1_000_000).toFixed(price % 1_000_000 ? 2 : 0).replace(".", ",")} млн</span>`,
    iconSize: [76, 32],
    iconAnchor: [38, 16]
  });
}

function renderMarkers(visible) {
  if (!map) return;
  markers.forEach(marker => marker.remove());
  markers = [];
  const grouped = Map.groupBy ? Map.groupBy(visible, item => item.project) : visible.reduce((acc, item) => {
    if (!acc.has(item.project)) acc.set(item.project, []);
    acc.get(item.project).push(item);
    return acc;
  }, new Map());

  grouped.forEach((items, projectId) => {
    const project = byProject.get(projectId);
    const cheapest = [...items].sort((a, b) => a.price - b.price)[0];
    const selected = items.some(item => item.id === selectedApartmentId);
    const marker = L.marker([project.lat, project.lng], {
      icon: createPriceIcon(cheapest.price, project.confirmed, selected),
      title: `${project.name}: от ${rub.format(cheapest.price)}`,
      keyboard: true
    }).addTo(map);
    marker.bindTooltip(`<strong>${project.name}</strong><br>${items.length} ${plural(items.length, "вариант", "варианта", "вариантов")} · ${project.distance.toFixed(2)} км`, { direction: "top", offset: [0, -12] });
    marker.on("click", () => openDetails(cheapest.id));
    markers.push(marker);
  });
}

function detailTemplate(apartment) {
  const project = byProject.get(apartment.project);
  const developer = developers[project.developer];
  const plan = apartment.image
    ? `<img src="${apartment.image}" alt="Планировка ${project.name}, ${apartment.area.toFixed(2)} м²" data-plan-image>`
    : `<p class="plan-placeholder">Изображение точной планировки не опубликовано в исходных данных. Откройте официальную карточку и перепроверьте лот.</p>`;
  const reserveWarning = apartment.status === "confirmed" ? "" : `<p class="detail-note"><strong>Не прямой лот.</strong> Цена или наличие не подтверждены официальной карточкой конкретной квартиры.</p>`;
  return `
    <div class="details-body">
      <p class="details-kicker">${developer.name} · ${project.distance.toFixed(2)} км от площади 1905 года</p>
      <h2 id="details-title">${project.name}, ${apartment.area.toFixed(2)} м²</h2>
      <p class="details-price">${rub.format(apartment.price)}<small>${integer.format(pricePerMeter(apartment))} ₽/м² · запас до бюджета ${rub.format(budget - apartment.price)}</small></p>
      ${reserveWarning}
      <div class="plan-frame">${plan}</div>
      <div class="facts">
        <div class="fact"><span>Планировка</span><strong>${apartment.type}</strong></div>
        <div class="fact"><span>Этаж</span><strong>${apartment.floor ?? "Уточнить"}</strong></div>
        <div class="fact"><span>Отделка</span><strong>${apartment.finish}</strong></div>
        <div class="fact"><span>Срок</span><strong>${apartment.deadline}</strong></div>
      </div>
      <p class="detail-note">${apartment.note}</p>
      <section class="finance-block" aria-labelledby="finance-title">
        <h3 id="finance-title">Финансовый контур: ${developer.name}</h3>
        <p class="finance-scope">${developer.scope}</p>
        <ul class="metric-list">${developer.metrics.map(metric => `<li>${metric}</li>`).join("")}</ul>
        <p>${developer.conclusion}</p>
      </section>
      <div class="details-actions">
        <a class="primary-link" href="${apartment.official}" target="_blank" rel="noopener">Открыть официальный источник</a>
        <a class="secondary-link" href="${developer.source}" target="_blank" rel="noopener">Финансовый источник</a>
      </div>
    </div>`;
}

function openDetails(apartmentId, trigger = null) {
  const apartment = apartments.find(item => item.id === apartmentId);
  if (!apartment) return;
  selectedApartmentId = apartmentId;
  lastFocused = trigger || document.activeElement;
  detailsContent.innerHTML = detailTemplate(apartment);
  const image = detailsContent.querySelector("[data-plan-image]");
  image?.addEventListener("error", () => {
    image.replaceWith(Object.assign(document.createElement("p"), {
      className: "plan-placeholder",
      textContent: "Планировка временно не загрузилась. Откройте официальный источник квартиры."
    }));
  });
  details.classList.add("is-open");
  details.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  detailsClose.focus();
  const project = byProject.get(apartment.project);
  map?.flyTo([project.lat, project.lng], Math.max(map.getZoom(), 14), { duration: .35 });
  render();
}

function closeDetails() {
  selectedApartmentId = null;
  details.classList.remove("is-open");
  details.setAttribute("aria-hidden", "true");
  backdrop.hidden = true;
  render();
  if (lastFocused instanceof HTMLElement) lastFocused.focus();
}

function resetFilters() {
  controls.price.value = "9500000";
  controls.area.value = "30";
  controls.type.value = "all";
  controls.finish.value = "all";
  controls.confirmed.checked = true;
  controls.sort.value = "price";
  render();
}

function initMap() {
  const mapElement = document.querySelector("#map");
  if (!window.L) {
    mapElement.innerHTML = '<p class="plan-placeholder">Карта не загрузилась. Список квартир и фильтры остаются доступны.</p>';
    return;
  }
  map = L.map("map", { zoomControl: true, attributionControl: true, preferCanvas: true }).setView([56.833, 60.604], 12);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);
  L.circle([56.8380, 60.5975], {
    radius: 5000,
    color: "#0f6b68",
    weight: 2,
    opacity: .62,
    fillColor: "#0f6b68",
    fillOpacity: .035,
    dashArray: "7 7",
    interactive: false
  }).addTo(map);
  L.circleMarker([56.8380, 60.5975], { radius: 6, color: "#fff", weight: 2, fillColor: "#a54035", fillOpacity: 1 })
    .addTo(map)
    .bindTooltip("Площадь 1905 года");
  fitMap();
}

function fitMap() {
  if (!map) return;
  const bounds = L.latLngBounds(projects.map(project => [project.lat, project.lng]));
  map.fitBounds(bounds.pad(.14), { maxZoom: 13 });
}

Object.values(controls).forEach(control => control.addEventListener("change", render));
document.querySelector("#reset-filters").addEventListener("click", resetFilters);
document.querySelector("[data-reset]").addEventListener("click", resetFilters);
document.querySelector("#fit-map").addEventListener("click", fitMap);
detailsClose.addEventListener("click", closeDetails);
backdrop.addEventListener("click", closeDetails);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && details.classList.contains("is-open")) closeDetails();
});

initMap();
render();

