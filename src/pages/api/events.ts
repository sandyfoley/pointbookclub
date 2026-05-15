import type { APIRoute } from "astro";
import { eventSchema } from "@/lib/schemas";
import { createEvent, getActiveMembers } from "@/lib/storage";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const base = new URL(request.url).pathname.replace(/\/api\/events$/, "") || "/";
  const parsed = eventSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    bookTitle: formData.get("bookTitle"),
    hostMemberId: formData.get("hostMemberId"),
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    location: formData.get("location")
  });

  if (!parsed.success) {
    return redirect(`${base}?status=invalid`);
  }

  const activeMembers = await getActiveMembers();
  const hostIsValid = !parsed.data.hostMemberId
    || activeMembers.some((member) => member.id === parsed.data.hostMemberId);

  if (!hostIsValid) {
    return redirect(`${base}?status=invalid`);
  }

  await createEvent({
    ...parsed.data,
    bookTitle:
      parsed.data.category === "Book Club meeting" ? parsed.data.bookTitle || undefined : undefined,
    hostMemberId:
      parsed.data.category === "Book Club meeting" ? parsed.data.hostMemberId || undefined : undefined,
    endTime: parsed.data.endTime || undefined
  });
  return redirect(`${base}?status=event-created`);
};
