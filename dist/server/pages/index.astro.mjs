import { e as createComponent, m as maybeRenderHead, g as addAttribute, k as renderComponent, r as renderTemplate, l as Fragment, h as createAstro, u as unescapeHTML, n as renderScript } from '../chunks/astro/server_Bd32JGa-.mjs';
import 'piccolore';
import { $ as $$BookTitleLink } from '../chunks/BookTitleLink_CzdAIA30.mjs';
/* empty css                                 */
import { e as getBooks, f as getUpcomingEvents, h as getCurrentBook, i as getNextBookClubMeeting } from '../chunks/storage_Q_EX_zQU.mjs';
import { f as formatEventDate, b as formatDisplayTime, $ as $$BaseLayout, c as buildStatusMessage } from '../chunks/format_8_UQvJSz.mjs';
import 'clsx';
import { E as EVENT_CATEGORIES } from '../chunks/types_BiwQKS5D.mjs';
import { $ as $$UpcomingEventsList } from '../chunks/UpcomingEventsList_DElOqdCq.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro();
const $$CurrentBookCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CurrentBookCard;
  const { book, books } = Astro2.props;
  const fallbackCover = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='620' viewBox='0 0 420 620'%3E%3Crect width='420' height='620' rx='36' fill='%238c5a3c'/%3E%3Crect x='42' y='52' width='28' height='516' fill='%23d8c2ab' opacity='.6'/%3E%3Ctext x='210' y='250' font-family='Georgia' font-size='34' text-anchor='middle' fill='white'%3ECurrent Book%3C/text%3E%3Ctext x='210' y='300' font-family='Georgia' font-size='20' text-anchor='middle' fill='white' opacity='.85'%3EBook Club Pick%3C/text%3E%3C/svg%3E";
  const cover = book?.coverImageUrl?.trim() || fallbackCover;
  const plainTitle = book?.title.replace(/<[^>]+>/g, "").trim() ?? "Generic book";
  return renderTemplate`${maybeRenderHead()}<article class="book-card card" data-astro-cid-2etb4ppu> <div class="book-cover" data-astro-cid-2etb4ppu> <a href="" target="_blank" data-astro-cid-2etb4ppu><img${addAttribute(cover, "src")}${addAttribute(book ? `${plainTitle} cover` : "Generic book cover", "alt")} loading="lazy" data-astro-cid-2etb4ppu></a> </div> <div class="book-copy" data-astro-cid-2etb4ppu> <div class="eyebrow" data-astro-cid-2etb4ppu>Current selection</div> ${book ? renderTemplate`<h2 data-astro-cid-2etb4ppu>${renderComponent($$result, "BookTitleLink", $$BookTitleLink, { "title": book.title, "books": books, "data-astro-cid-2etb4ppu": true })}</h2>` : renderTemplate`<h2 data-astro-cid-2etb4ppu>No book selected yet</h2>`} ${book ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-2etb4ppu": true }, { "default": ($$result2) => renderTemplate` <p data-astro-cid-2etb4ppu>Chosen by ${book.pickedBy}</p> <p data-astro-cid-2etb4ppu>${book.bookClubMonthOrDate}</p> ` })}` : renderTemplate`<p data-astro-cid-2etb4ppu>Add a book below to choose the current read.</p>`} </div> </article> `;
}, "C:/Projects/git/calendar/src/components/CurrentBookCard.astro", void 0);

const $$Astro$2 = createAstro();
const $$EventSummaryCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$EventSummaryCard;
  const { event } = Astro2.props;
  const books = await getBooks();
  return renderTemplate`${maybeRenderHead()}<article class="event-summary card" data-astro-cid-okknux32> <div class="eyebrow" data-astro-cid-okknux32>Next Book Club Meeting</div> ${event ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-okknux32": true }, { "default": async ($$result2) => renderTemplate` <h2 data-astro-cid-okknux32>${event.name}</h2> ${event.bookTitle && renderTemplate`<p class="linked-book" data-astro-cid-okknux32>Book: ${renderComponent($$result2, "BookTitleLink", $$BookTitleLink, { "title": event.bookTitle, "books": books, "data-astro-cid-okknux32": true })}</p>`}<p data-astro-cid-okknux32>${unescapeHTML(event.description)}</p> <dl data-astro-cid-okknux32> <div data-astro-cid-okknux32> <dt data-astro-cid-okknux32>Date</dt> <dd data-astro-cid-okknux32>${formatEventDate(event.date)}</dd> </div> <div data-astro-cid-okknux32> <dt data-astro-cid-okknux32>Time</dt> <dd data-astro-cid-okknux32> ${formatDisplayTime(event.startTime)} ${event.endTime ? ` to ${formatDisplayTime(event.endTime)}` : ""} </dd> </div> <div data-astro-cid-okknux32> <dt data-astro-cid-okknux32>Location</dt> <dd data-astro-cid-okknux32>${event.location}</dd> </div> </dl> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-okknux32": true }, { "default": async ($$result2) => renderTemplate` <h2 data-astro-cid-okknux32>No book club meeting scheduled yet</h2> <p data-astro-cid-okknux32>Add a \`Book Club meeting\` event below to highlight the next discussion night.</p> ` })}`} </article> `;
}, "C:/Projects/git/calendar/src/components/EventSummaryCard.astro", void 0);

const $$Astro$1 = createAstro();
const $$FormsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FormsSection;
  const { books } = Astro2.props;
  const strippedBooks = books.map((book) => ({
    value: book.title,
    label: book.title.replace(/<[^>]+>/g, "").trim()
  }));
  return renderTemplate`${maybeRenderHead()}<section class="section" id="forms" data-astro-cid-hrnxs7qe> <div class="grid-two" data-astro-cid-hrnxs7qe> <form class="card form-card" method="POST" action="/api/events" data-astro-cid-hrnxs7qe> <div class="eyebrow" data-astro-cid-hrnxs7qe>Add an event</div> <h2 data-astro-cid-hrnxs7qe>Share a calendar event</h2> <div class="field-grid" data-astro-cid-hrnxs7qe> <label data-astro-cid-hrnxs7qe>
Event name
<input name="name" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Description
<textarea name="description" required data-astro-cid-hrnxs7qe></textarea> </label> <label data-astro-cid-hrnxs7qe>
Category
<select name="category" required data-event-category data-astro-cid-hrnxs7qe> ${EVENT_CATEGORIES.map((category) => renderTemplate`<option${addAttribute(category, "value")} data-astro-cid-hrnxs7qe>${category}</option>`)} </select> </label> <label class="book-title-field" data-book-title-field hidden data-astro-cid-hrnxs7qe>
Book title
<select name="bookTitle" data-astro-cid-hrnxs7qe> <option value="" data-astro-cid-hrnxs7qe>Select a book title</option> ${strippedBooks.map((book) => renderTemplate`<option${addAttribute(book.value, "value")} data-astro-cid-hrnxs7qe>${book.label}</option>`)} </select> </label> </div> <div class="field-grid three" data-astro-cid-hrnxs7qe> <label data-astro-cid-hrnxs7qe>
Date
<input type="date" name="date" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Start time
<input type="time" name="startTime" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
End time
<input type="time" name="endTime" data-astro-cid-hrnxs7qe> </label> </div> <label data-astro-cid-hrnxs7qe>
Location
<input name="location" required data-astro-cid-hrnxs7qe> </label> <button class="button-primary" type="submit" data-astro-cid-hrnxs7qe>Add event</button> </form> <form class="card form-card" method="POST" action="/api/books" data-astro-cid-hrnxs7qe> <div class="eyebrow" data-astro-cid-hrnxs7qe>Book tracker</div> <h2 data-astro-cid-hrnxs7qe>Add a book club title</h2> <div class="field-grid" data-astro-cid-hrnxs7qe> <label data-astro-cid-hrnxs7qe>
Title
<input name="title" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Member who picked the book
<input name="pickedBy" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Amazon URL
<input type="url" name="amazonUrl" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Book club month or date
<input name="bookClubMonthOrDate" required data-astro-cid-hrnxs7qe> </label> </div> <label class="checkbox-row" data-astro-cid-hrnxs7qe> <input type="checkbox" name="isCurrent" data-astro-cid-hrnxs7qe>
Mark as the current selection
</label> <button class="button-primary" type="submit" data-astro-cid-hrnxs7qe>Add book</button> </form> </div> <div class="grid-two forms-lower" data-astro-cid-hrnxs7qe> <form class="card form-card" method="POST" action="/api/member-signups" data-astro-cid-hrnxs7qe> <div class="eyebrow" data-astro-cid-hrnxs7qe>Membership</div> <h2 data-astro-cid-hrnxs7qe>Join the club</h2> <div class="field-grid" data-astro-cid-hrnxs7qe> <label data-astro-cid-hrnxs7qe>
Your name
<input name="memberName" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Email
<input type="email" name="email" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Notes
<textarea name="notes" data-astro-cid-hrnxs7qe></textarea> </label> </div> <button class="button-primary" type="submit" data-astro-cid-hrnxs7qe>Save interest</button> </form> <form class="card form-card" method="POST" action="/api/member-invites" data-astro-cid-hrnxs7qe> <div class="eyebrow" data-astro-cid-hrnxs7qe>Invite a friend</div> <h2 data-astro-cid-hrnxs7qe>Invite another member</h2> <div class="field-grid two" data-astro-cid-hrnxs7qe> <label data-astro-cid-hrnxs7qe>
Your name
<input name="inviterName" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Your email
<input type="email" name="inviterEmail" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Invitee name
<input name="inviteeName" required data-astro-cid-hrnxs7qe> </label> <label data-astro-cid-hrnxs7qe>
Invitee email
<input type="email" name="inviteeEmail" required data-astro-cid-hrnxs7qe> </label> </div> <label data-astro-cid-hrnxs7qe>
Message
<textarea name="message" data-astro-cid-hrnxs7qe></textarea> </label> <button class="button-primary" type="submit" data-astro-cid-hrnxs7qe>Save invite request</button> </form> </div> </section> ${renderScript($$result, "C:/Projects/git/calendar/src/components/FormsSection.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Projects/git/calendar/src/components/FormsSection.astro", void 0);

const $$HeroShelf = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="hero card" data-astro-cid-v736dak2> <div class="hero-media" data-astro-cid-v736dak2> <img src="/images/bookshelfJune2026.png" alt="A moody shelf of previously read book club books" loading="eager" data-astro-cid-v736dak2> </div> <div class="hero-copy" data-astro-cid-v736dak2> <h1 data-astro-cid-v736dak2>Get to the Point Book Club</h1> <p data-astro-cid-v736dak2>Upcoming gatherings, current reads, and shared club planning.</p> <div class="hero-actions" data-astro-cid-v736dak2> <a class="button-link button-primary" href="/calendar" data-astro-cid-v736dak2>View the Calendar</a> <a class="button-link" href="#forms" data-astro-cid-v736dak2>Add an Event or Book</a> </div> </div> </section> `;
}, "C:/Projects/git/calendar/src/components/HeroShelf.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const status = Astro2.url.searchParams.get("status");
  const statusMessage = buildStatusMessage(status);
  const upcomingEvents = await getUpcomingEvents(5);
  const currentBook = await getCurrentBook();
  const nextMeeting = await getNextBookClubMeeting();
  const books = await getBooks();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Get to the Point Book Club", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container section" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "HeroShelf", $$HeroShelf, { "data-astro-cid-j7pv25f6": true })} ${statusMessage && renderTemplate`<div class="status-banner" data-astro-cid-j7pv25f6>${statusMessage}</div>`} </main> <section class="container section overview-grid" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <div class="section-head" data-astro-cid-j7pv25f6> <div class="eyebrow" data-astro-cid-j7pv25f6>Coming up</div> <h2 data-astro-cid-j7pv25f6>The next few events</h2> </div> ${renderComponent($$result2, "UpcomingEventsList", $$UpcomingEventsList, { "events": upcomingEvents, "compact": true, "data-astro-cid-j7pv25f6": true })} <div class="section-link" style="padding-top:30px" data-astro-cid-j7pv25f6> <a class="button-link" href="/events" data-astro-cid-j7pv25f6>See all upcoming events</a> </div> </div> ${renderComponent($$result2, "CurrentBookCard", $$CurrentBookCard, { "book": currentBook, "books": books, "data-astro-cid-j7pv25f6": true })} </section> <section class="container section" data-astro-cid-j7pv25f6> <div class="grid-two home-detail-grid" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "EventSummaryCard", $$EventSummaryCard, { "event": nextMeeting, "data-astro-cid-j7pv25f6": true })} <article class="card library-card" data-astro-cid-j7pv25f6> <div class="eyebrow" data-astro-cid-j7pv25f6>Reading library</div> <h2 data-astro-cid-j7pv25f6>Books we have read</h2> <ul data-astro-cid-j7pv25f6> ${books.map((book) => renderTemplate`<li${addAttribute([book.isCurrent && "current"], "class:list")} data-astro-cid-j7pv25f6> ${renderComponent($$result2, "BookTitleLink", $$BookTitleLink, { "title": book.title, "books": books, "data-astro-cid-j7pv25f6": true })} <span data-astro-cid-j7pv25f6>${book.bookClubMonthOrDate}</span> </li>`)} </ul> </article> </div> </section> <div class="container" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "FormsSection", $$FormsSection, { "books": books, "data-astro-cid-j7pv25f6": true })} </div> ` })} `;
}, "C:/Projects/git/calendar/src/pages/index.astro", void 0);

const $$file = "C:/Projects/git/calendar/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
