import { e as createComponent, m as maybeRenderHead, g as addAttribute, k as renderComponent, r as renderTemplate, u as unescapeHTML, h as createAstro } from './astro/server_Bd32JGa-.mjs';
import 'piccolore';
import { $ as $$BookTitleLink } from './BookTitleLink_CzdAIA30.mjs';
import { e as getBooks } from './storage_Q_EX_zQU.mjs';
import { f as formatEventDate, b as formatDisplayTime } from './format_8_UQvJSz.mjs';
/* empty css                          */

const $$Astro = createAstro();
const $$UpcomingEventsList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UpcomingEventsList;
  const { events, compact = false } = Astro2.props;
  const books = await getBooks();
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["events-list", compact && "compact"], "class:list")} data-astro-cid-akegqqcl> ${events.map((event) => renderTemplate`<article${addAttribute(["event-item", "card", event.category === "Book Club meeting" && "book-club-event"], "class:list")} data-astro-cid-akegqqcl> <div class="event-top" data-astro-cid-akegqqcl> <span${addAttribute(["eyebrow", event.category === "Book Club meeting" && "book-club-eyebrow"], "class:list")} data-astro-cid-akegqqcl> ${event.category} </span> <h3 data-astro-cid-akegqqcl> <a class="event-link"${addAttribute(`/events/${event.id}`, "href")} data-astro-cid-akegqqcl>${event.name}</a> </h3> </div> <p data-astro-cid-akegqqcl>${event.location}</p> <p data-astro-cid-akegqqcl>${formatEventDate(event.date)}</p> <p data-astro-cid-akegqqcl>${formatDisplayTime(event.startTime)}</p> ${event.bookTitle && renderTemplate`<p class="event-book" data-astro-cid-akegqqcl>Book: ${renderComponent($$result, "BookTitleLink", $$BookTitleLink, { "title": event.bookTitle, "books": books, "data-astro-cid-akegqqcl": true })}</p>`} ${!compact && renderTemplate`<p data-astro-cid-akegqqcl>${unescapeHTML(event.description)}</p>`} </article>`)} </div> `;
}, "C:/Projects/git/calendar/src/components/UpcomingEventsList.astro", void 0);

export { $$UpcomingEventsList as $ };
