import type { APIRoute } from "astro";
import { memberSignupSchema } from "@/lib/schemas";
import { createMemberSignup } from "@/lib/storage";

export const POST: APIRoute = async ({ request, redirect }) => {
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
