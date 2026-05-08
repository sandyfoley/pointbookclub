import { e as createComponent, o as renderHead, p as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_Bd32JGa-.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */
import { format, parseISO } from 'date-fns';

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "Get to the Point Book Club" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="A polished book club calendar with events, current reading, and member signup tools."><title>${title}</title>${renderHead()}</head> <body> <header class="site-header"> <div class="container site-header-inner"> <div class="brand">Get to the Point Book Club</div> <nav class="nav"> <a href="/">Home</a> <a href="/calendar">Calendar</a> <a href="/events">Upcoming Events</a> </nav> </div> </header> ${renderSlot($$result, $$slots["default"])} <footer class="footer container">
Thoughtful reads, welcoming gatherings, and simple tools for staying connected.
</footer> </body></html>`;
}, "C:/Projects/git/calendar/src/layouts/BaseLayout.astro", void 0);

function formatEventDate(date) {
  return format(parseISO(date), "EEEE, MMMM d, yyyy");
}
function formatShortDate(date) {
  return format(parseISO(date), "MMM d");
}
function formatDisplayTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const date = /* @__PURE__ */ new Date();
  date.setHours(hour, minute, 0, 0);
  return format(date, "h:mm a");
}
function buildStatusMessage(status) {
  switch (status) {
    case "event-created":
      return "Event added to the calendar.";
    case "book-created":
      return "Book added successfully.";
    case "signup-created":
      return "Membership interest saved.";
    case "invite-created":
      return "Invitation request saved.";
    case "invalid":
      return "Please correct the highlighted form details and try again.";
    default:
      return "";
  }
}

export { $$BaseLayout as $, formatShortDate as a, formatDisplayTime as b, buildStatusMessage as c, formatEventDate as f };
