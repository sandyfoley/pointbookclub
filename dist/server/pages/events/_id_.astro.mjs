import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_Bd32JGa-.mjs';
import 'piccolore';
import { $ as $$BookTitleLink } from '../../chunks/BookTitleLink_CzdAIA30.mjs';
import { g as getEvents, e as getBooks } from '../../chunks/storage_Q_EX_zQU.mjs';
import { $ as $$BaseLayout, f as formatEventDate, b as formatDisplayTime } from '../../chunks/format_8_UQvJSz.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const events = await getEvents();
  const books = await getBooks();
  const event = events.find((item) => item.id === id);
  if (!event) {
    return Astro2.redirect("/events");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${event.name} | Get to the Point Book Club`, "data-astro-cid-xoscxyy6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container section" data-astro-cid-xoscxyy6> <article class="event-detail card" data-astro-cid-xoscxyy6> <div class="detail-head" data-astro-cid-xoscxyy6> <div data-astro-cid-xoscxyy6> <div class="eyebrow" data-astro-cid-xoscxyy6>${event.category}</div> <h1 data-astro-cid-xoscxyy6>${event.name}</h1> </div> <a class="button-link" href="/calendar" data-astro-cid-xoscxyy6>Back to calendar</a> </div> <p class="lead" data-astro-cid-xoscxyy6>${unescapeHTML(event.description)}</p> ${event.bookTitle && renderTemplate`<p class="linked-book" data-astro-cid-xoscxyy6>Book: ${renderComponent($$result2, "BookTitleLink", $$BookTitleLink, { "title": event.bookTitle, "books": books, "data-astro-cid-xoscxyy6": true })}</p>`} <dl class="detail-grid" data-astro-cid-xoscxyy6> <div data-astro-cid-xoscxyy6> <dt data-astro-cid-xoscxyy6>Date</dt> <dd data-astro-cid-xoscxyy6>${formatEventDate(event.date)}</dd> </div> <div data-astro-cid-xoscxyy6> <dt data-astro-cid-xoscxyy6>Start time</dt> <dd data-astro-cid-xoscxyy6>${formatDisplayTime(event.startTime)}</dd> </div> <div data-astro-cid-xoscxyy6> <dt data-astro-cid-xoscxyy6>End time</dt> <dd data-astro-cid-xoscxyy6>${event.endTime ? formatDisplayTime(event.endTime) : "Not specified"}</dd> </div> <div data-astro-cid-xoscxyy6> <dt data-astro-cid-xoscxyy6>Location</dt> <dd data-astro-cid-xoscxyy6>${event.location}</dd> </div> </dl> </article> </main> ` })} `;
}, "C:/Projects/git/calendar/src/pages/events/[id].astro", void 0);

const $$file = "C:/Projects/git/calendar/src/pages/events/[id].astro";
const $$url = "/events/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
