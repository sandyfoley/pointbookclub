import { m as memberInviteSchema } from '../../chunks/schemas_DDWPTAEq.mjs';
import { b as createMemberInvite } from '../../chunks/storage_Q_EX_zQU.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const parsed = memberInviteSchema.safeParse({
    inviterName: formData.get("inviterName"),
    inviterEmail: formData.get("inviterEmail"),
    inviteeName: formData.get("inviteeName"),
    inviteeEmail: formData.get("inviteeEmail"),
    message: formData.get("message")
  });
  if (!parsed.success) {
    return redirect("/?status=invalid");
  }
  await createMemberInvite(parsed.data);
  return redirect("/?status=invite-created");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
