import { a as memberSignupSchema } from '../../chunks/schemas_DDWPTAEq.mjs';
import { d as createMemberSignup } from '../../chunks/storage_Q_EX_zQU.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const parsed = memberSignupSchema.safeParse({
    memberName: formData.get("memberName"),
    email: formData.get("email"),
    notes: formData.get("notes")
  });
  if (!parsed.success) {
    return redirect("/?status=invalid");
  }
  await createMemberSignup(parsed.data);
  return redirect("/?status=signup-created");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
