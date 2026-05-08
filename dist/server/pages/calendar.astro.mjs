import { e as createComponent, r as renderTemplate, k as renderComponent, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_Bd32JGa-.mjs';
import 'piccolore';
import { f as formatEventDate, a as formatShortDate, b as formatDisplayTime, $ as $$BaseLayout } from '../chunks/format_8_UQvJSz.mjs';
import { startOfMonth, parseISO, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, isSameMonth, addDays } from 'date-fns';
import { g as getEvents } from '../chunks/storage_Q_EX_zQU.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

function buildCalendarMonth(referenceDate, events) {
  const monthStart = startOfMonth(referenceDate);
  const monthEnd = endOfMonth(referenceDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  return eachDayOfInterval({ start: gridStart, end: gridEnd }).map((day) => {
    const isoDate = format(day, "yyyy-MM-dd");
    return {
      date: day,
      isoDate,
      isCurrentMonth: isSameMonth(day, monthStart),
      isToday: isSameDay(day, /* @__PURE__ */ new Date()),
      events: events.filter((event) => event.date === isoDate)
    };
  });
}
function getMonthLabel(referenceDate) {
  return format(referenceDate, "MMMM yyyy");
}
function getAdjacentMonth(referenceDate, delta) {
  return addDays(startOfMonth(referenceDate), delta > 0 ? 32 : -1);
}
function parseMonthParam(value) {
  if (!value) return startOfMonth(/* @__PURE__ */ new Date());
  const parsed = parseISO(`${value}-01`);
  return Number.isNaN(parsed.valueOf()) ? startOfMonth(/* @__PURE__ */ new Date()) : parsed;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Calendar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Calendar;
  const monthValue = Astro2.url.searchParams.get("month");
  const selectedMonth = parseMonthParam(monthValue);
  const events = await getEvents();
  const cells = buildCalendarMonth(selectedMonth, events);
  const monthLabel = getMonthLabel(selectedMonth);
  const prevMonth = getAdjacentMonth(selectedMonth, -1).toISOString().slice(0, 7);
  const nextMonth = getAdjacentMonth(selectedMonth, 1).toISOString().slice(0, 7);
  return renderTemplate(_a || (_a = __template(["", ' <script>\n  // @ts-nocheck\n  const modal = document.querySelector("[data-calendar-modal]");\n  const modalDate = document.querySelector("[data-modal-date]");\n  const modalEvents = document.querySelector("[data-modal-events]");\n  const closeButton = document.querySelector("[data-close-modal]");\n  const triggers = document.querySelectorAll(".mobile-day-trigger");\n\n  const buildEventMarkup = (event) => {\n    const bookLine = event.bookTitle ? `<p class="modal-book">Book: ${event.bookTitle}</p>` : "";\n    const timeLine = event.endTime ? `${event.startTime} to ${event.endTime}` : event.startTime;\n    const roseClass = event.category === "Book Club meeting" ? " book-club-event" : "";\n\n    return `\n      <article class="modal-event${roseClass}">\n        <h3><a href="/events/${event.id}">${event.name}</a></h3>\n        <p>${event.location}</p>\n        <p>${timeLine}</p>\n        ${bookLine}\n        <div class="modal-description">${event.description}</div>\n      </article>\n    `;\n  };\n\n  triggers.forEach((trigger) => {\n    trigger.addEventListener("click", () => {\n      const cell = trigger.closest(".day-cell");\n      if (!cell || !(modal instanceof HTMLDialogElement) || !modalDate || !modalEvents) return;\n\n      const dateLabel = cell.getAttribute("data-date-label") || "Selected day";\n      const rawEvents = cell.getAttribute("data-events") || "[]";\n      const events = JSON.parse(rawEvents);\n\n      modalDate.textContent = dateLabel;\n      modalEvents.innerHTML = events.map(buildEventMarkup).join("");\n      modal.showModal();\n    });\n  });\n\n  closeButton?.addEventListener("click", () => {\n    if (modal instanceof HTMLDialogElement) {\n      modal.close();\n    }\n  });\n\n  modal?.addEventListener("click", (event) => {\n    if (event.target === modal && modal instanceof HTMLDialogElement) {\n      modal.close();\n    }\n  });\n<\/script> '], ["", ' <script>\n  // @ts-nocheck\n  const modal = document.querySelector("[data-calendar-modal]");\n  const modalDate = document.querySelector("[data-modal-date]");\n  const modalEvents = document.querySelector("[data-modal-events]");\n  const closeButton = document.querySelector("[data-close-modal]");\n  const triggers = document.querySelectorAll(".mobile-day-trigger");\n\n  const buildEventMarkup = (event) => {\n    const bookLine = event.bookTitle ? \\`<p class="modal-book">Book: \\${event.bookTitle}</p>\\` : "";\n    const timeLine = event.endTime ? \\`\\${event.startTime} to \\${event.endTime}\\` : event.startTime;\n    const roseClass = event.category === "Book Club meeting" ? " book-club-event" : "";\n\n    return \\`\n      <article class="modal-event\\${roseClass}">\n        <h3><a href="/events/\\${event.id}">\\${event.name}</a></h3>\n        <p>\\${event.location}</p>\n        <p>\\${timeLine}</p>\n        \\${bookLine}\n        <div class="modal-description">\\${event.description}</div>\n      </article>\n    \\`;\n  };\n\n  triggers.forEach((trigger) => {\n    trigger.addEventListener("click", () => {\n      const cell = trigger.closest(".day-cell");\n      if (!cell || !(modal instanceof HTMLDialogElement) || !modalDate || !modalEvents) return;\n\n      const dateLabel = cell.getAttribute("data-date-label") || "Selected day";\n      const rawEvents = cell.getAttribute("data-events") || "[]";\n      const events = JSON.parse(rawEvents);\n\n      modalDate.textContent = dateLabel;\n      modalEvents.innerHTML = events.map(buildEventMarkup).join("");\n      modal.showModal();\n    });\n  });\n\n  closeButton?.addEventListener("click", () => {\n    if (modal instanceof HTMLDialogElement) {\n      modal.close();\n    }\n  });\n\n  modal?.addEventListener("click", (event) => {\n    if (event.target === modal && modal instanceof HTMLDialogElement) {\n      modal.close();\n    }\n  });\n<\/script> '])), renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Calendar | Get to the Point Book Club", "data-astro-cid-sl2ubhge": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container section" data-astro-cid-sl2ubhge> <div class="calendar-shell card" data-astro-cid-sl2ubhge> <div class="calendar-header" data-astro-cid-sl2ubhge> <div data-astro-cid-sl2ubhge> <div class="eyebrow" data-astro-cid-sl2ubhge>Monthly view</div> <h1 data-astro-cid-sl2ubhge>${monthLabel}</h1> </div> <div class="month-nav" data-astro-cid-sl2ubhge> <a class="button-link"${addAttribute(`/calendar?month=${prevMonth}`, "href")} data-astro-cid-sl2ubhge>Previous</a> <a class="button-link" href="/calendar" data-astro-cid-sl2ubhge>Today</a> <a class="button-link button-primary"${addAttribute(`/calendar?month=${nextMonth}`, "href")} data-astro-cid-sl2ubhge>Next</a> </div> </div> <div class="weekday-row" data-astro-cid-sl2ubhge> <span data-astro-cid-sl2ubhge>Sun</span> <span data-astro-cid-sl2ubhge>Mon</span> <span data-astro-cid-sl2ubhge>Tue</span> <span data-astro-cid-sl2ubhge>Wed</span> <span data-astro-cid-sl2ubhge>Thu</span> <span data-astro-cid-sl2ubhge>Fri</span> <span data-astro-cid-sl2ubhge>Sat</span> </div> <div class="calendar-grid" data-astro-cid-sl2ubhge> ${cells.map((cell) => renderTemplate`<article${addAttribute(["day-cell", !cell.isCurrentMonth && "muted", cell.isToday && "today", cell.events.length > 0 && "has-events"], "class:list")}${addAttribute(formatEventDate(cell.isoDate), "data-date-label")}${addAttribute(JSON.stringify(cell.events), "data-events")} data-astro-cid-sl2ubhge> <header data-astro-cid-sl2ubhge> <span data-astro-cid-sl2ubhge>${formatShortDate(cell.isoDate)}</span> ${cell.events.length > 0 && renderTemplate`<span class="mobile-event-dot" aria-hidden="true" data-astro-cid-sl2ubhge></span>`} </header> <div class="day-events" data-astro-cid-sl2ubhge> ${cell.events.map((event) => renderTemplate`<a${addAttribute(["day-event", event.category === "Book Club meeting" && "book-club-event"], "class:list")}${addAttribute(`/events/${event.id}`, "href")} data-astro-cid-sl2ubhge> <strong data-astro-cid-sl2ubhge>${event.name}</strong> <span data-astro-cid-sl2ubhge>${formatDisplayTime(event.startTime)}</span> </a>`)} </div> ${cell.events.length > 0 && renderTemplate`<button class="mobile-day-trigger" type="button"${addAttribute(`View events for ${formatEventDate(cell.isoDate)}`, "aria-label")} data-astro-cid-sl2ubhge>
View day events
</button>`} </article>`)} </div> </div> </main> <dialog class="calendar-modal" data-calendar-modal data-astro-cid-sl2ubhge> <div class="calendar-modal-head" data-astro-cid-sl2ubhge> <div data-astro-cid-sl2ubhge> <div class="eyebrow" data-astro-cid-sl2ubhge>Day events</div> <h2 data-modal-date data-astro-cid-sl2ubhge>Selected day</h2> </div> <button class="button-link" type="button" data-close-modal data-astro-cid-sl2ubhge>Close</button> </div> <div class="calendar-modal-events" data-modal-events data-astro-cid-sl2ubhge></div> </dialog> ` }));
}, "C:/Projects/git/calendar/src/pages/calendar.astro", void 0);

const $$file = "C:/Projects/git/calendar/src/pages/calendar.astro";
const $$url = "/calendar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calendar,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
