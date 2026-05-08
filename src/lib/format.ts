import { format, parseISO } from "date-fns";

export function formatEventDate(date: string) {
  return format(parseISO(date), "EEEE, MMMM d, yyyy");
}

export function formatShortDate(date: string) {
  return format(parseISO(date), "MMM d");
}

export function formatDisplayTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return format(date, "h:mm a");
}

export function buildStatusMessage(status: string | null) {
  switch (status) {
    case "event-created":
      return "Event added to the calendar.";
    case "book-created":
      return "Book added successfully.";
    case "signup-created":
      return "Membership interest saved.";
    case "invite-created":
      return "Invitation request saved.";
    case "invalid":
      return "Please correct the highlighted form details and try again.";
    default:
      return "";
  }
}
