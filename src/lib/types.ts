export const EVENT_CATEGORIES = [
  "Book Club meeting",
  "Discussion",
  "Social",
  "Planning",
  "Community",
  "Other"
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface EventRecord {
  id: string;
  name: string;
  description: string;
  category: EventCategory;
  bookTitle?: string;
  hostMemberId?: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  createdAt: string;
}

export interface BookRecord {
  id: string;
  title: string;
  pickedBy: string;
  amazonUrl: string;
  bookClubMonthOrDate: string;
  isCurrent: boolean;
  coverImageUrl?: string;
}

export interface MemberSignupRecord {
  id: string;
  memberName: string;
  email: string;
  notes?: string;
  createdAt: string;
}

export interface MemberInviteRecord {
  id: string;
  inviterName: string;
  inviterEmail: string;
  inviteeName: string;
  inviteeEmail: string;
  message?: string;
  createdAt: string;
}

export const MEMBER_PERMISSIONS = ["Admin", "Member"] as const;

export type MemberPermission = (typeof MEMBER_PERMISSIONS)[number];

export interface MemberRecord {
  id: string;
  name: string;
  permissions: MemberPermission;
  active: boolean;
  address: string;
  email: string;
  spouse: string;
  phone: string;
  createdAt: string;
}
