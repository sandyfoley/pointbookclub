import type { APIRoute } from "astro";
import { memberInviteSchema } from "@/lib/schemas";
import { createMemberInvite } from "@/lib/storage";

export const POST: APIRoute = async ({ request, redirect }) => {
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
