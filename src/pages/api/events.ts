import type { APIRoute } from "astro";
import { eventSchema } from "@/lib/schemas";
import { createEvent } from "@/lib/storage";

export const POST: APIRoute = async ({ request, redirect }) => {
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
    bookTitle:
      parsed.data.category === "Book Club meeting" ? parsed.data.bookTitle || undefined : undefined,
    endTime: parsed.data.endTime || undefined
  });
  return redirect("/?status=event-created");
};
