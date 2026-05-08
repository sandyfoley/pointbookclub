import { b as bookSchema } from '../../chunks/schemas_DDWPTAEq.mjs';
import { c as createBook } from '../../chunks/storage_Q_EX_zQU.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const parsed = bookSchema.safeParse({
    title: formData.get("title"),
    pickedBy: formData.get("pickedBy"),
    amazonUrl: formData.get("amazonUrl"),
    bookClubMonthOrDate: formData.get("bookClubMonthOrDate"),
    isCurrent: formData.get("isCurrent")
  });
  if (!parsed.success) {
    return redirect("/?status=invalid");
  }
  await createBook({
    title: parsed.data.title,
    pickedBy: parsed.data.pickedBy,
    amazonUrl: parsed.data.amazonUrl,
    bookClubMonthOrDate: parsed.data.bookClubMonthOrDate,
    isCurrent: parsed.data.isCurrent === "on" || parsed.data.isCurrent === "true"
  });
  return redirect("/?status=book-created");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
