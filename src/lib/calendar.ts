import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek
} from "date-fns";
import type { EventRecord } from "@/lib/types";

export interface CalendarCell {
  date: Date;
  isoDate: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: EventRecord[];
}

export function buildCalendarMonth(referenceDate: Date, events: EventRecord[]) {
  const monthStart = startOfMonth(referenceDate);
  const monthEnd = endOfMonth(referenceDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: gridStart, end: gridEnd }).map((day) => {
    const isoDate = format(day, "yyyy-MM-dd");
    return {
      date: day,
      isoDate,
      isCurrentMonth: isSameMonth(day, monthStart),
      isToday: isSameDay(day, new Date()),
      events: events.filter((event) => event.date === isoDate)
    } satisfies CalendarCell;
  });
}

export function getMonthLabel(referenceDate: Date) {
  return format(referenceDate, "MMMM yyyy");
}

export function getAdjacentMonth(referenceDate: Date, delta: number) {
  return addDays(startOfMonth(referenceDate), delta > 0 ? 32 : -1);
}

export function parseMonthParam(value: string | null) {
  if (!value) return startOfMonth(new Date());
  const parsed = parseISO(`${value}-01`);
  return Number.isNaN(parsed.valueOf()) ? startOfMonth(new Date()) : parsed;
}
