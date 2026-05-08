import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro } from './astro/server_Bd32JGa-.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$BookTitleLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BookTitleLink;
  const { title, books, className } = Astro2.props;
  const normalizedTitle = title.replace(/<[^>]+>/g, "").trim();
  const matchingBook = books.find(
    (book) => book.title.replace(/<[^>]+>/g, "").trim() === normalizedTitle
  );
  const href = matchingBook?.amazonUrl?.trim();
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(["book-title-link", className], "class:list")}${addAttribute(href, "href")} target="_blank" rel="noreferrer" data-astro-cid-fjxuo2o5>${normalizedTitle}</a>` : renderTemplate`<span${addAttribute(["book-title-link", "book-title-fallback", className], "class:list")} data-astro-cid-fjxuo2o5>${normalizedTitle}</span>`}`;
}, "C:/Projects/git/calendar/src/components/BookTitleLink.astro", void 0);

export { $$BookTitleLink as $ };
