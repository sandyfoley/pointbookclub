import type { APIRoute } from "astro";
import { bookSchema } from "@/lib/schemas";
import { createBook } from "@/lib/storage";

export const POST: APIRoute = async ({ request, redirect }) => {
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
