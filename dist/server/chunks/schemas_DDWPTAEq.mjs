import { z } from 'zod';
import { E as EVENT_CATEGORIES } from './types_BiwQKS5D.mjs';

const eventSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().min(5).max(1200),
  category: z.enum(EVENT_CATEGORIES),
  bookTitle: z.string().trim().max(160).optional().or(z.literal("")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/).optional().or(z.literal("")),
  location: z.string().trim().min(2).max(160)
});
const bookSchema = z.object({
  title: z.string().trim().min(2).max(160),
  pickedBy: z.string().trim().min(2).max(120),
  amazonUrl: z.url().max(600),
  bookClubMonthOrDate: z.string().trim().min(2).max(80),
  isCurrent: z.union([z.literal("on"), z.literal("true"), z.literal("false"), z.literal("")]).optional()
});
const memberSignupSchema = z.object({
  memberName: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  notes: z.string().trim().max(500).optional().or(z.literal(""))
});
const memberInviteSchema = z.object({
  inviterName: z.string().trim().min(2).max(120),
  inviterEmail: z.email().max(200),
  inviteeName: z.string().trim().min(2).max(120),
  inviteeEmail: z.email().max(200),
  message: z.string().trim().max(500).optional().or(z.literal(""))
});

export { memberSignupSchema as a, bookSchema as b, eventSchema as e, memberInviteSchema as m };
