import { z } from "zod";
import { EVENT_CATEGORIES, MEMBER_PERMISSIONS } from "@/lib/types";

export const eventSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().min(5).max(1200),
  category: z.enum(EVENT_CATEGORIES),
  bookTitle: z.string().trim().max(160).optional().or(z.literal("")),
  hostMemberId: z.string().trim().max(120).optional().or(z.literal("")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/).optional().or(z.literal("")),
  location: z.string().trim().min(2).max(160)
}).superRefine((value, ctx) => {
  if (value.category === "Book Club meeting" && !value.hostMemberId) {
    ctx.addIssue({
      code: "custom",
      path: ["hostMemberId"],
      message: "Host is required for book club meetings."
    });
  }
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(160),
  pickedBy: z.string().trim().min(2).max(120),
  amazonUrl: z.string().trim().url().max(600),
  bookClubMonthOrDate: z.string().trim().min(2).max(80),
  isCurrent: z
    .union([z.literal("on"), z.literal("true"), z.literal("false"), z.literal("")])
    .optional()
});

export const memberSignupSchema = z.object({
  memberName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  notes: z.string().trim().max(500).optional().or(z.literal(""))
});

export const memberInviteSchema = z.object({
  inviterName: z.string().trim().min(2).max(120),
  inviterEmail: z.string().trim().email().max(200),
  inviteeName: z.string().trim().min(2).max(120),
  inviteeEmail: z.string().trim().email().max(200),
  message: z.string().trim().max(500).optional().or(z.literal(""))
});

export const memberSchema = z.object({
  name: z.string().trim().min(2).max(120),
  permissions: z.enum(MEMBER_PERMISSIONS),
  active: z.boolean(),
  address: z.string().trim().max(240),
  email: z.string().trim().email().max(200),
  spouse: z.string().trim().max(120),
  phone: z.string().trim().max(40)
});
