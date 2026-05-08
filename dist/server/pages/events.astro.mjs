import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bd32JGa-.mjs';
import 'piccolore';
import { $ as $$UpcomingEventsList } from '../chunks/UpcomingEventsList_DElOqdCq.mjs';
import { $ as $$BaseLayout } from '../chunks/format_8_UQvJSz.mjs';
import { f as getUpcomingEvents } from '../chunks/storage_Q_EX_zQU.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Events = createComponent(async ($$result, $$props, $$slots) => {
  const events = await getUpcomingEvents();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Upcoming Events | Get to the Point Book Club", "data-astro-cid-ro7pgs3h": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container section" data-astro-cid-ro7pgs3h> <div class="page-head" data-astro-cid-ro7pgs3h> <div class="eyebrow" data-astro-cid-ro7pgs3h>Upcoming events</div> <h1 data-astro-cid-ro7pgs3h>Everything coming up next</h1> <p data-astro-cid-ro7pgs3h>
A clear chronological list of future gatherings, discussions, and social events.
</p> </div> ${renderComponent($$result2, "UpcomingEventsList", $$UpcomingEventsList, { "events": events, "data-astro-cid-ro7pgs3h": true })} </main> ` })} `;
}, "C:/Projects/git/calendar/src/pages/events.astro", void 0);

const $$file = "C:/Projects/git/calendar/src/pages/events.astro";
const $$url = "/events";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Events,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
