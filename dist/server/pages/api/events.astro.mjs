import { e as eventSchema } from '../../chunks/schemas_DDWPTAEq.mjs';
import { a as createEvent } from '../../chunks/storage_Q_EX_zQU.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const parsed = eventSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    bookTitle: formData.get("bookTitle"),
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    location: formData.get("location")
  });
  if (!parsed.success) {
    return redirect("/?status=invalid");
  }
  await createEvent({
    ...parsed.data,
    bookTitle: parsed.data.category === "Book Club meeting" ? parsed.data.bookTitle || void 0 : void 0,
    endTime: parsed.data.endTime || void 0
  });
  return redirect("/?status=event-created");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
